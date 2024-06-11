import { getDiastereotopicAtomIDsAndH, getHoseCodes } from 'openchemlib-utils';
import { generateSpectrum } from 'spectrum-generator';

let data;

/**
 *
 * @param {import('openchemlib').Molecule} [molecule]
 * @param {object} options
 * @param {string} [options.statsKey='gw']
 * @param {import('spectrum-generator').GenerateSpectrumOptions} [options.spectrum]
 */
export async function predictUsingHoseCodes(molecule, options = {}) {
  const { statsKey = 'gw', spectrum: spectrumOptions } = options;
  await ensureSpheres();

  const spheres = data.spheres[statsKey];
  const diaIDs = getDiastereotopicAtomIDsAndH(molecule);
  const annotations = [];
  const annotationOptions = { verticalPosition: 0 };
  let values = getHoseCodes(molecule, {
    maxSphereSize: 2,
    atomLabels: ['O', 'C'],
  })
    .map((hoses, index) => ({
      hoses,
      atomLabel: molecule.getAtomLabel(index),
      _highlight: [diaIDs[index].oclID],
    }))
    .filter((value) => value.hoses);
  for (const hoseCode of values) {
    if (!hoseCode.hoses) continue;
    for (let i = hoseCode.hoses.length - 1; i >= 0; i--) {
      const hose = hoseCode.hoses[i];
      const sphere = spheres[i];
      if (!sphere) {
        throw new Error(`sphere not found: ${i} - ${hoseCode.hoses.length}`);
      }
      const prediction = sphere.hoses[hose];
      if (prediction) {
        hoseCode.prediction = prediction;
        break;
      }
    }
  }

  const peaks = values
    .filter((value) => value.prediction)
    .map((value) => ({ x: value.prediction.boxplot.median, y: 1 }));
  const spectrum = generateSpectrum(peaks, spectrumOptions);

  // values should be unique based on value.prediction.idCode
  // during this operation we should take care to combine _highlights
  const uniqueValuesObject = {};
  for (const value of values) {
    const key = `${value.prediction.idCode}`;
    if (uniqueValuesObject[key]) {
      const highlight = value._highlight[0];
      if (!uniqueValuesObject[key]._highlight.includes(highlight)) {
        uniqueValuesObject[key]._highlight.push(highlight);
      }
    } else {
      uniqueValuesObject[key] = value;
    }
  }
  values = Object.values(uniqueValuesObject);

  values = values.sort(
    (a, b) => a.prediction.boxplot.median - b.prediction.boxplot.median,
  );

  for (const hoseCode of values) {
    annotations.push(
      ...getAnnotations(
        hoseCode.prediction,
        hoseCode._highlight,
        annotationOptions,
      ),
    );
  }

  return { values, spectrum, annotations, peaks };
}

async function ensureSpheres() {
  if (data) return data;
  const url = `https://data.cheminfo.org/xps/qm9.json`;
  const response = await fetch(url);
  data = await response.json();

  console.log(Objecdata)
}

function getAnnotations(prediction, highlight, options) {
  const annotations = [
    {
      position: [
        {
          x: prediction.boxplot.q1,
          y: `${options.verticalPosition * 8 + 2}px`,
        },
        {
          x: prediction.boxplot.q3,
          y: `${options.verticalPosition * 8 + 6}px`,
        },
      ],
      type: 'rect',
      fillColor: 'transparent',
      strokeColor: 'orange',
      _highlight: highlight,
    },
    {
      position: [
        {
          x: prediction.boxplot.min,
          y: `${options.verticalPosition * 8 + 4}px`,
        },
        {
          x: prediction.boxplot.max,
          y: `${options.verticalPosition * 8 + 4}px`,
        },
      ],
      type: 'line',
      fillColor: 'transparent',
      strokeColor: 'orange',
    },
    {
      position: [
        {
          x: prediction.boxplot.median,
          y: `${options.verticalPosition * 8 + 2}px`,
        },
        {
          x: prediction.boxplot.median,
          y: `${options.verticalPosition * 8 + 6}px`,
        },
      ],
      type: 'line',
      fillColor: 'transparent',
      strokeColor: 'darkorange',
    },
  ];
  options.verticalPosition = (options.verticalPosition + 1) % 7;
  return annotations;
}
