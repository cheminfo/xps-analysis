import { writeFileSync } from 'fs';

import OCL from 'openchemlib';
import { parseDwar } from "openchemlib-utils";

const response = await fetch('https://data.cheminfo.org/xps/polymerDB.dwar');
const content = await response.arrayBuffer();

const result = parseDwar(content).data

console.log(result)

for (const entry of result) {

  const molecule = OCL.Molecule.fromIDCode(entry.Monomer);
  entry.smiles = molecule.toSmiles()
}

writeFileSync('polymerDB.json', JSON.stringify(result, null, 2))

console.log(result)