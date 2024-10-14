import OCL from 'openchemlib';
import { test, expect } from 'vitest';

import { predictUsingAI } from '../predictUsingAI.js';

test('predictUsingAI', async () => {
  const molecule = OCL.Molecule.fromSmiles('CCO');

  const result = await predictUsingAI(molecule);
  expect(result);
  expect(result.peaks).toHaveLength(3);
});
