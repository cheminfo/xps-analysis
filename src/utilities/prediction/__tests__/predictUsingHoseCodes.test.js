import OCL from 'openchemlib';

import { predictUsingHoseCodes } from '../predictUsingHoseCodes.js';

test('predictUsingHoseCodes', async () => {
  const molecule = OCL.Molecule.fromSmiles('CCO');

  const result = await predictUsingHoseCodes(molecule);
  expect(Object.keys(result)).toHaveLength(4);
  expect(Object.keys(result)).toStrictEqual([
    'grouped',
    'spectrum',
    'annotations',
    'peaks',
  ]);
});
