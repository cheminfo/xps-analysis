import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from 'vitest';

import { fromVamas } from '../../../from/fromVamas.js';
import { appendBackground } from '../appendBackground.js';

test('background', () => {
  const text = readFileSync(
    join(import.meta.dirname, '../../../../testFiles/polyethyleneglycol.vms'),
    'utf8',
  );
  const { spectra } = fromVamas(text);
  const c1s = spectra[1];

  expect(() => appendBackground(c1s)).not.toThrow();
});
