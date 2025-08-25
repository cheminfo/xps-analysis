import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { fromVamas, toJcamp } from '..';

describe('fromVamas', () => {
  it('VAMAS multiplex', () => {
    const text = readFileSync(
      join(__dirname, '../../testFiles/multiplex.vms'),
      'utf8',
    );
    let result = fromVamas(text);

    let jcamp = toJcamp(result);

    expect(jcamp.length).toBeGreaterThan(35000);
    expect(jcamp.length).toBeLessThan(40000);
  });

  it('VAMAS assigned', () => {
    const text = readFileSync(
      join(__dirname, '../../testFiles/assigned.vms'),
      'utf8',
    );
    let result = fromVamas(text);
    let jcamp = toJcamp(result);

    expect(jcamp.indexOf('CASA')).toBeGreaterThan(30000);
    expect(jcamp.length).toBeGreaterThan(579000);

    let cheminfo = jcamp
      .split(/\r?\n/)
      .filter((line) => line.includes('##$cheminfo='));

    expect(cheminfo).toHaveLength(54);
    expect(cheminfo[0]).toMatch('region');
    expect(cheminfo[7]).toMatch('S 2p WS2');
  });
});
