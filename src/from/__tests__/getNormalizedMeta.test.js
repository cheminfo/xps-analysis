import { expect, test } from 'vitest';

import { getNormalizedMeta } from '../getNormalizedMeta';

import meta from './meta.json';

test('appendCheminfoMeta', () => {
  const normalized = getNormalizedMeta(meta);

  expect(normalized.analysisSource.characteristicEnergy.value).toStrictEqual(
    1486.69,
  );
  expect(normalized.analysisSource.characteristicEnergy.units).toBe('eV');
  expect(normalized.energyType.kind).toBe('kinetic');
  expect(normalized.analysisSource.beamWidthX.value).toBe(1e37);
  expect(normalized.analysisSource.beamWidthY.value).toBe(1e37);
  expect(normalized.analysisSource.beamWidthX.units).toBe('um');
  expect(normalized.components).toHaveLength(8);
});
