import { Molecule } from 'openchemlib';
import { expect, test } from 'vitest';

import { predictPolymer } from '../predictPolymer.js';

test('predictPolymer', async () => {
  const idCode = 'gJQDHODnJRmT@@'; // [R2]OCC[R1]
  const molecule = Molecule.fromIDCode(idCode);
  const polymer = await predictPolymer(molecule);

  expect(polymer).toHaveProperty('grouped');
});
