import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from 'vitest';

import { fromVamas } from '../index.js';
import { peakPicking } from '../peakPicking.js';

test('check number of peaks with default options', () => {
  const text = readFileSync(
    join(import.meta.dirname, '../../testFiles/multiplex.vms'),
    'utf8',
  );
  const analysis = fromVamas(text);
  const result = peakPicking(analysis.getXYSpectrum());

  expect(result).toHaveLength(12);
});
