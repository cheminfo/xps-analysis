import OCL from 'openchemlib';
import { expect, test } from 'vitest';

import { predictUsingAI } from '../predictUsingAI.js';

test('predictUsingAI', async () => {
  const molecule = OCL.Molecule.fromSmiles('CCO');

  const result = await predictUsingAI(molecule);

  expect(result.peaks).toHaveLength(3);
}, 60000);
