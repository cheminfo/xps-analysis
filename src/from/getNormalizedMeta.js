import { parseRegion } from './parseRegion.js';

export function getNormalizedMeta(meta = {}) {
  const normalized = {};
  normalized.region = parseRegion(meta['block identifier']);
  const energyType = {};
  energyType.kind = meta['abscissa label']
    .replace('energy', '')
    .replace(/\s/g, '')
    .toLowerCase();
  energyType.unit = meta['abscissa units'];
  normalized.energyType = energyType;

  const source = {};
  source.label = meta['analysis source label'];
  source.characteristicEnergy = {
    value: meta['analysis source characteristic energy'],
    unit: 'eV',
  };
  source.beamWidthX = {
    value: meta['analysis source beam width x'],
    unit: 'um',
  };
  source.beamWidthY = {
    value: meta['analysis source beam width y'],
    unit: 'um',
  };
  normalized.analysisSource = source;

  return normalized;
}