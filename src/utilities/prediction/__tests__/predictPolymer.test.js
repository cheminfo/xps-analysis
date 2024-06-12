import { Molecule } from 'openchemlib'

import { predictPolymer } from '../predictPolymer'

test('predictPolymer', async () => {
  const idCode = "gJQDHODnJRmT@@" // [R2]OCC[R1]
  const molecule = Molecule.fromIDCode(idCode)
  const polymer = await predictPolymer(molecule)
  console.log(polymer)
})