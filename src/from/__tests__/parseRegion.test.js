import { describe, expect, it } from 'vitest';

import { parseRegion } from '../parseRegion.js';

describe('XPS region parser', () => {
  it('wide', () => {
    let region = parseRegion('wide');

    expect(region.name).toBe('wide');
    expect(region.orbital).toStrictEqual({
      element: null,
      shell: null,
      angularMomentum: null,
    });
    expect(region.auger).toStrictEqual({
      element: null,
      transition: null,
    });
  });

  it('Auger', () => {
    let region = parseRegion('Cu LMM');

    expect(region.orbital).toStrictEqual({
      element: null,
      shell: null,
      angularMomentum: null,
    });
    expect(region.auger).toStrictEqual({
      element: 'Cu',
      transition: 'LMM',
    });
  });

  it('XPS detail', () => {
    let region = parseRegion('O 1s');

    expect(region.orbital).toStrictEqual({
      element: 'O',
      shell: 1,
      angularMomentum: 's',
    });
    expect(region.auger).toStrictEqual({
      element: null,
      transition: null,
    });
  });
});
