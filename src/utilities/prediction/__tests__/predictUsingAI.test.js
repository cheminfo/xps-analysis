import OCL from 'openchemlib';

import { predictUsingAI } from '../predictUsingAI.js';

test('predictUsingAI', async () => {
  const molecule = OCL.Molecule.fromSmiles('CCO');

  const result = await predictUsingAI(molecule);
  console.log(result);
});
