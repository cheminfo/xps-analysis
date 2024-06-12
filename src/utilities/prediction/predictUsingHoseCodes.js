import { getDiastereotopicAtomIDsAndH, getHoseCodes } from 'openchemlib-utils';
import { generateSpectrum } from 'spectrum-generator';

let data;

const xShiftFcts = {
  solid: {
    C1s: (x) => -2501.002792622873 + 18.12807741 * x - 0.02938832 * x ** 2,
    O1s: (x) => -14914.578039681715 + 5.67166123e1 * x - 5.20506217e-2 * x ** 2,
  },
};

/**
 *
 * @param {import('openchemlib').Molecule} [molecule]
 * @param {object} options
 * @param {string} [options.statsKey='gw']
 * @param {number|undefined} [options.atomMapNo] // allows to filter for specific atoms
 * @param {'solid'|'none'} [options.energyReference='solid']
 * @param {import('spectrum-generator').GenerateSpectrumOptions} [options.spectrum]
 */
export async function predictUsingHoseCodes(molecule, options = {}) {
  const {
    statsKey = 'gw',
    spectrum: spectrumOptions,
    energyReference = 'solid',
    atomMapNo,
  } = options;
  await ensureSpheres();

  const spheres = data.spheres[statsKey];
  const diaIDs = getDiastereotopicAtomIDsAndH(molecule);
  const annotations = [];
  const annotationOptions = { verticalPosition: 0 };

  let values = getHoseCodes(molecule, {
    maxSphereSize: 2,
  })
    .map((hoses, index) => ({
      hoses,
      atomLabel: molecule.getAtomLabel(index),
      atomNumber: index,
      atomMapNo: molecule.getAtomMapNo(index),
      _highlight: [diaIDs[index].oclID],
    }))
    .filter(
      (value) =>
        value.atomLabel && value.atomLabel !== 'H' && value.atomLabel !== '?',
    )
    .filter((value) => value.hoses)
    .filter((value) => !atomMapNo || value.atomMapNo === atomMapNo);

  for (const hoseCode of values) {
    for (let i = hoseCode.hoses.length - 1; i >= 0; i--) {
      const hose = hoseCode.hoses[i];
      const sphere = spheres[i];
      if (!sphere) {
        throw new Error(`sphere not found: ${i} - ${hoseCode.hoses.length}`);
      }
      const prediction = sphere.hoses[hose];
      if (prediction) {
        hoseCode.prediction = structuredClone(prediction);
        break;
      }
    }
  }

  // before anything else we should shift if required
  for (const hoseCode of values) {
    const transition = `${hoseCode.atomLabel}1s`;
    const xShiftFct = xShiftFcts[energyReference]?.[transition];
    if (xShiftFct) {
      for (const key of Object.keys(hoseCode.prediction.boxplot)) {
        hoseCode.prediction.boxplot[key] = xShiftFct(
          hoseCode.prediction.boxplot[key],
        );
      }
    }
  }

  const peaks = values
    .filter((value) => value.prediction)
    .map((value) => ({
      x: value.prediction.boxplot.median,
      y: 1,
    }));

  // todo shift values if required
  const spectrum = generateSpectrum(peaks, spectrumOptions);

  // values should be unique based on value.prediction.idCode
  // during this operation we should take care to combine _highlights
  const uniqueValuesObject = {};
  for (const value of values) {
    const key = `${value.prediction.idCode}`;
    if (uniqueValuesObject[key]) {
      uniqueValuesObject[key].atomNumbers.push(value.atomNumber);
      const highlight = value._highlight[0];
      if (!uniqueValuesObject[key]._highlight.includes(highlight)) {
        uniqueValuesObject[key]._highlight.push(highlight);
      }
    } else {
      // eslint-disable-next-line no-unused-vars
      const { atomNumber, ...uniqueValueObject } = {
        ...value,
        atomNumbers: [value.atomNumber],
      };
      uniqueValuesObject[key] = uniqueValueObject;
    }
  }
  const grouped = Object.values(uniqueValuesObject).sort(
    (a, b) => a.prediction.boxplot.median - b.prediction.boxplot.median,
  );

  for (const hoseCode of grouped) {
    annotations.push(
      ...getAnnotations(
        hoseCode.prediction,
        hoseCode._highlight,
        annotationOptions,
      ),
    );
  }

  return { grouped, spectrum, annotations, peaks };
}

async function ensureSpheres() {
  if (data) return data;
  const url = `https://data.cheminfo.org/xps/qm9.json`;
  const response = await fetch(url);
  //We do a global in place modification,
  // eslint-disable-next-line require-atomic-updates
  data = await response.json();
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
