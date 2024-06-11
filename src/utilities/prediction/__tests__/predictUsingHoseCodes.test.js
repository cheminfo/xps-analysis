import OCL from 'openchemlib';

import { predictUsingHoseCodes } from '../predictUsingHoseCodes.js';

test('predictUsingHoseCodes', async () => {
  const molecule = OCL.Molecule.fromSmiles('CCO');

  const result = await predictUsingHoseCodes(molecule);
  console.log(result);
});
