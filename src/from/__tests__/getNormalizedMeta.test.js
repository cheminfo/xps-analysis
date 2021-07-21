import { getNormalizedMeta } from '../getNormalizedMeta';

import meta from './meta.json';

test('appendCheminfoMeta', () => {
  const normalized = getNormalizedMeta(meta);
  expect(normalized.analysisSource.characteristicEnergy.value).toStrictEqual(
    1486.69,
  );
  expect(normalized.analysisSource.characteristicEnergy.units).toStrictEqual(
    'eV',
  );
  expect(normalized.energyType.kind).toStrictEqual('kinetic');
  expect(normalized.analysisSource.beamWidthX.value).toStrictEqual(1e37);
  expect(normalized.analysisSource.beamWidthY.value).toStrictEqual(1e37);
  expect(normalized.analysisSource.beamWidthX.units).toStrictEqual('um');
  expect(normalized.components).toHaveLength(8);
});
