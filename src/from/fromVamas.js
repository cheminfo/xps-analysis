import { ensureString } from 'ensure-string';
import { parse } from 'vamas';

import { Analysis } from '..';

import { getNormalizedMeta } from './getNormalizedMeta';

/**
 * Returns an Analysis from a VAMAS text file
 * @param {arrayBuffer|string} [text] the vamas text file
 */
export function fromVamas(text) {
  text = ensureString(text);
  let parsed = parse(text);
  let header = parsed.header;
  let blocks = parsed.blocks;
  let title = header['experiment identifier'];
  let analysis = new Analysis();
  for (let block of blocks) {
    let sourceEnergy = block['analysis source characteristic energy'];

    let yVariable = block.correspondingVariables[0];
    let yLabel = yVariable.label;
    let yValues = yVariable.array;

    let xLabel = block['abscissa label'];
    let xUnits = block['abscissa units'];
    let xStart = block['abscissa start'];
    let xIncrement = block['abscissa increment'];
    let xValues = new Float64Array(yValues.length);
    for (let i = 0; i < yValues.length; i++) {
      xValues[i] = xStart + xIncrement * i;
    }
    // currently we take the first corresponding variables

    let meta = {};
    for (let key in block) {
      if (typeof block[key] === 'string' || typeof block[key] === 'number') {
        meta[key] = block[key];
      }
    }

    for (let key in header) {
      if (typeof header[key] === 'string' || typeof header[key] === 'number') {
        meta[key] = header[key];
      }
    }

    meta.cheminfo = { meta: getNormalizedMeta(meta) };

    const variables = {};
    if (xLabel === 'Kinetic energy' && sourceEnergy) {
      // we will calculate binding energy
      variables.x = {
        data: xValues.map((value) => sourceEnergy - value).reverse(),
        label: 'Binding energy',
        units: xUnits,
        type: 'DEPENDENT',
      };
      variables.y = {
        data: yValues.reverse(),
        label: yLabel,
        type: 'DEPENDENT',
      };
      variables.k = {
        data: xValues.reverse(),
        label: xLabel,
        units: xUnits,
        type: 'INDEPENDENT',
      };
    } else {
      variables.x = {
        data: xValues,
        label: xLabel,
        units: xUnits,
        type: 'INDEPENDENT',
      };
      variables.y = {
        data: yValues,
        label: yLabel,
        type: 'DEPENDENT',
      };
    }

    analysis.pushSpectrum(variables, {
      dataType: 'XPS',
      title,
      meta,
    });
  }

  return analysis;
}
