import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { test } from 'vitest';

import { fromVamas } from '../../../from/fromVamas.js';
import { appendBackground } from '../appendBackground.js';

test('background', () => {
  const text = readFileSync(
    join(__dirname, '../../../../testFiles/polyethyleneglycol.vms'),
    'utf8',
  );
  const { spectra } = fromVamas(text);
  const c1s = spectra[1];

  appendBackground(c1s);
});
