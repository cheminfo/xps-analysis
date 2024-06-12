import OCL from 'openchemlib';

import { predictUsingHoseCodes } from '../predictUsingHoseCodes.js';

test('predictUsingHoseCodes', async () => {
  const molecule = OCL.Molecule.fromSmiles('CCO');

  const resultNoRef = await predictUsingHoseCodes(molecule, {
    energyReference: 'none',
  });
  expect(Object.keys(resultNoRef)).toHaveLength(4);
  expect(Object.keys(resultNoRef)).toStrictEqual([
    'grouped',
    'spectrum',
    'annotations',
    'peaks',
  ]);

  expect(resultNoRef.peaks[0]).toStrictEqual({
    transition: 'C1s',
    x: 290.6834,
    y: 1,
  });

  const resultSolidRef = await predictUsingHoseCodes(molecule, {
    energyReference: 'solid',
  });
  expect(resultSolidRef.peaks[0].x).toBeCloseTo(285.30823, 4);
});
