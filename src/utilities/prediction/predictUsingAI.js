import { generateSpectrum } from 'spectrum-generator';

const cache = {};

/**
 *
 * @param {import('openchemlib').Molecule} [molecule]
 * @param {object} options
 * @param {number} [options.xShift=0]
 * @param {import('spectrum-generator').GenerateSpectrumOptions} [options.spectrum]
 */
export async function predictUsingAI(molecule, options = {}) {
  const { spectrum: spectrumOptions } = options;

  const moleculeWithH = molecule.getCompactCopy();
  moleculeWithH.addImplicitHydrogens();

  const molfile = moleculeWithH.toMolfile();

  if (!cache[molfile]) {
    const response = await fetch(
      'https://xps-service.cheminfo.org/v1/predict_binding_energies',
      {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          molFile: molfile,
          method: 'GFN2xTB',
          fmax: 0.01,
        }),
      },
    );
    cache[molfile] = await response.json();
  }

  const predictions = cache[molfile].predictions;

  const peaks = [];
  const xyz = [predictions.length, 'XTB optimized geometry'];
  for (const prediction of predictions) {
    xyz.push(
      [
        prediction.atom,
        prediction.position.x,
        prediction.position.y,
        prediction.position.z,
      ].join(' '),
    );
    const orbitals = Object.keys(prediction.prediction);
    if (!orbitals) continue;
    for (const orbital of orbitals) {
      peaks.push({
        x: prediction.prediction[orbital].bindingEnergy,
        y: 1,
        standardDeviation: prediction.prediction[orbital].standardDeviation,
      });
    }
  }

  const spectrum = generateSpectrum(peaks, spectrumOptions);

  return {
    peaks,
    spectrum,
    xyz: xyz.join('\n'),
  };
}
