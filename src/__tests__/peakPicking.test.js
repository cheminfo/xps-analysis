import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { beforeAll, describe, expect, it } from 'vitest';

import { fromVamas } from '..';
import { peakPicking } from '../peakPicking';

describe('peakPicking', () => {
  let analysis;

  beforeAll(() => {
    const text = readFileSync(
      join(__dirname, '../../testFiles/multiplex.vms'),
      'utf8',
    );
    analysis = fromVamas(text);
  });

  it('check number of peaks with default options', () => {
    let result = peakPicking(analysis.getXYSpectrum());

    expect(result).toHaveLength(12);
  });
});
