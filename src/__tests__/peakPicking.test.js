import { readFileSync } from 'fs';
import { join } from 'path';

import { describe, it, expect } from 'vitest';

import { fromVamas } from '..';
import { peakPicking } from '../peakPicking';

describe('peakPicking', () => {
  const text = readFileSync(
    join(__dirname, '../../testFiles/multiplex.vms'),
    'utf8',
  );

  let analysis = fromVamas(text);

  it('check number of peaks with default options', () => {
    let result = peakPicking(analysis.getXYSpectrum());
    expect(result).toHaveLength(12);
  });
});
