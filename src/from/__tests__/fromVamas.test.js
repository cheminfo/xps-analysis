import { readFileSync } from 'fs';
import { join } from 'path';

import { fromVamas } from '../fromVamas';

describe('fromVamas', () => {
  const text = readFileSync(
    join(__dirname, '../../../testFiles/multiplex.vms'),
    'utf8',
  );
  const augerText = readFileSync(
    join(__dirname, '../../../testFiles/auger.vms'),
    'utf8',
  );
  it('multiplex', () => {
    let result = fromVamas(text).spectra[0];
    expect(Object.keys(result.variables)).toHaveLength(3);
    expect(Object.keys(result.meta)).toHaveLength(62);
    expect(typeof result.meta.cheminfo.meta).toBe('object');
  });

  it('auger', () => {
    let result = fromVamas(augerText).spectra[0];
    expect(Object.keys(result.variables)).toHaveLength(2);
    expect(Object.keys(result.meta)).toHaveLength(62);
    expect(typeof result.meta.cheminfo.meta).toBe('object');
  });
});
