import { createPolymer, } from 'openchemlib-utils';

import { predictUsingHoseCodes } from './predictUsingHoseCodes.js';


export async function predictPolymer(monomer, options = {}) {
  const { Molecule } = monomer.getOCL()
  const polymer = createPolymer(monomer, {
    count: 5, // we create 5 monomers and we use the middle one
    markMonomer: true,
    ...getAlphaGamma(Molecule),
  });

  const prediction = await predictUsingHoseCodes(polymer, { atomMapNo: 3, ...options });

  return prediction
}


function getAlphaGamma(Molecule) {
  const r1AtomicNo = Molecule.getAtomicNoFromLabel(
    'R1',
    Molecule.cPseudoAtomsRGroups,
  );
  const r2AtomicNo = Molecule.getAtomicNoFromLabel(
    'R2',
    Molecule.cPseudoAtomsRGroups,
  );
  const alpha = Molecule.fromSmiles('C[2H]');
  alpha.setAtomicNo(0, r1AtomicNo);
  const gamma = Molecule.fromSmiles('C[2H]');
  gamma.setAtomicNo(0, r2AtomicNo);
  return { alpha, gamma };
}


