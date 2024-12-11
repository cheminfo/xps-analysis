import { parseCASA } from 'vamas';

import { mapComponents } from './mapComponents.js';
import { mapRegions } from './mapRegions.js';
import { parseRegion } from './parseRegion.js';

export function getNormalizedMeta(meta = {}) {
  const normalized = {};
  normalized.region = parseRegion(meta['block identifier']);
  const energyType = {};
  energyType.kind = meta['abscissa label']
    .replace('energy', '')
    .replaceAll(/\s/g, '')
    .toLowerCase();
  energyType.units = meta['abscissa units'];
  normalized.energyType = energyType;

  const source = {};
  source.label = meta['analysis source label'];
  source.characteristicEnergy = {
    value: meta['analysis source characteristic energy'],
    units: 'eV',
  };
  source.beamWidthX = {
    value: meta['analysis source beam width x'],
    units: 'um',
  };
  source.beamWidthY = {
    value: meta['analysis source beam width y'],
    units: 'um',
  };
  normalized.analysisSource = source;
  normalized.speciesLabel = meta['species label'];
  const parsedCASAs = parseCASA(meta.blockComment);
  normalized.components = mapComponents(
    parsedCASAs,
    source.characteristicEnergy.value,
  );
  normalized.regions = mapRegions(
    parsedCASAs,
    source.characteristicEnergy.value,
  );

  const increment = meta['abscissa increment'];
  normalized.from = meta['abscissa start'];
  normalized.to =
    meta['abscissa start'] + increment * (meta.nbOrdinateValues - 1);

  normalized.analyserMode = meta['analyser mode'];

  return normalized;
}
