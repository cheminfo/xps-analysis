import { parseDwar, TopicMolecule } from 'openchemlib-utils';

let dwar;

export async function predictPolymer(molecule, options = {}) {
  const polymers = OCLUtils.parseDwar(dwar).data.filter(
    (entry) => entry.Monomer,
  );

  for (const entry of polymers) {
    const alpha = Molecule.fromSmiles('C[2H]');
    const gamma = Molecule.fromSmiles('C[2H]');
    const polymer = OCLUtils.createPolymer(Molecule.fromIDCode(entry.Monomer), {
      count: 5, // we create 5 monomers and we use the middle one
      markMonomer: true,
      ...getAlphaGamma(Molecule),
    });
    entry.polymer = polymer.getIDCode();
    entry.polymerMF = polymer.getMolecularFormula().formula;

    const monomer = Molecule.fromIDCode(`${entry.Monomer}`);
    entry.monomerMF = monomer.getMolecularFormula().formula;

    entry.hoses = getHoseCodes(polymer);
  }

  API.createData('polymers', polymers);

  function getHoseCodes(polymer) {
    const topicMolecule = new TopicMolecule(polymer, { maxNbAtoms: 500 });
    const hoses = topicMolecule.hoseCodes;
    const results = [];
    for (let sphere = 0; sphere < hoses[0].length; sphere++) {
      results.push({ sphere, hoses: {} });
    }
    for (let index = 0; index < hoses.length; index++) {
      if (polymer.getAtomMapNo(index) !== 3) continue;
      const entry = hoses[index];
      for (let sphere = 0; sphere < hoses[0].length; sphere++) {
        const hose = entry[sphere];
        if (!results[sphere].hoses[hose]) {
          results[sphere].hoses[hose] = {
            hose,
            counter: 0,
          };
        }
        results[sphere].hoses[hose].counter++;
      }
    }
    for (const result of results) {
      result.hoses = Object.values(result.hoses);
    }
    return results;
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
}

async function ensureDB() {
  if (dwar) return;
  const response = await fetch('https://data.cheminfo.org/xps/polymerDB.dwar');
  const content = await response.arrayBuffer();
  dwar = parseDwar(content).data;
}
