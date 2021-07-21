import { parseCASA } from 'vamas';

import { mapComponents } from '../mapComponents';

describe('mapComponents', () => {
  const parsedBlockComment =
    parseCASA(`CASA comp (*Mo 3d MoS2 2H*) (*LA(1.53,243)*) Area 230.36971 1e-020 2327991 -1 1 MFWHM 0.88528218 0.2 2 -1 1 Position 1257.22 1257.02 1257.22 -1 1 RSF 10.804667 MASS 95.9219 INDEX -1 (*Mo 3d*) CONST (**) UNCORRECTEDRSF 9.5
CASA comp (*Mo 3d MoS2 2H*) (*LA(1.53,243)*) Area 153.57981 1e-020 2327991 0 0.66666667 MFWHM 0.76493355 0.65389948 1.2538995 -1 1 Position 1254.08 0 0 0 -3.14 RSF 10.804667 MASS 95.9219 INDEX -1 (*Mo 3d*) CONST (**) UNCORRECTEDRSF 9.5
CASA comp (*Mo 3d MoS2 1T*) (*LA(1.53,243)*z) Area 7955.3136 1e-020 2327991 -1 1 MFWHM 0.91171962 0.2533 1.5 -1 1 Position 1257.89 1257.89 1258.49 -1 1 RSF 10.804667 MASS 95.9219 INDEX -1 (*Mo 3d*) CONST (**) UNCORRECTEDRSF 9.5
CASA comp (*Mo 3d MoS2 1T*) (*LA(1.53,243)*) Area 5303.5425 1e-020 2327991 2 0.66666667 MFWHM 0.91171962 0.2532592 6.33148 2 1 Position 1254.75 0 0 2 -3.14 RSF 10.804667 MASS 95.9219 INDEX -1 (*Mo 3d*) CONST (**) UNCORRECTEDRSF 9.5
CASA comp (*Mo 3d MoO3*) (*LA(1.53,243)*) Area 1401.4078 1e-020 1384876 -1 1 MFWHM 0.99977143 0.285 2 -1 1 Position 1253.99 1253.39 1253.99 -1 1 RSF 10.804667 MASS 95.9219 INDEX -1 (*Mo 3d*) CONST (**) UNCORRECTEDRSF 9.5
CASA comp (*S 2s*) (*LA(1.53,243)*) Area 3602.311 1e-020 2327991 -1 1 MFWHM 1.7375263 0.20524482 5.1311205 -1 1 Position 1260.5811 1258.0143 1262.0143 -1 1 RSF 10.804667 MASS 95.9219 INDEX -1 (*Mo 3d*) CONST (**) UNCORRECTEDRSF 9.5
CASA comp (*Mo 3d MoO2*) (*LA(1.53,243)*) Area 863.91709 1e-020 2327991 -1 1 MFWHM 1.0329112 0.2949 2 -1 1 Position 1255.8573 1255.8573 1256.4573 -1 1 RSF 10.804667 MASS 95.9219 INDEX -1 (*Mo 3d*) CONST (**) UNCORRECTEDRSF 9.5
CASA comp (*Mo 3d MoO2*) (*LA(1.53,243)*) Area 575.94473 1e-020 2327991 6 0.66666667 MFWHM 1.0329112 0.2949286 7.3732149 6 1 Position 1252.7173 0 0 6 -3.14 RSF 10.804667 MASS 95.9219 INDEX -1 (*Mo 3d*) CONST (**) UNCORRECTEDRSF 9.5
CASA comp (*Mo 3d MoO3*) (*LA(1.53,243)*) Area 2669.5646 1e-020 2327991 -1 1 MFWHM 1.4420932 0.2537 2 -1 1 Position 1254.5622 1253.615 1254.69 -1 1 RSF 10.804667 MASS 95.9219 INDEX -1 (*Mo 3d*) CONST (**) UNCORRECTEDRSF 9.5
CASA comp (*Mo 3d MoO3*) (*LA(1.53,243)*) Area 1779.7097 1e-020 2327991 8 0.66666667 MFWHM 1.4420932 0.25368427 6.3421067 8 1 Position 1251.4222 0 0 8 -3.14 RSF 10.804667 MASS 95.9219 INDEX -1 (*Mo 3d*) CONST (**) UNCORRECTEDRSF 9.5`);

  it('test the mapping', () => {
    let mappedComponents = mapComponents(parsedBlockComment, 10);
    expect(mappedComponents).toHaveLength(10);
    expect(mappedComponents[0]).toHaveProperty('kineticEnergy');
    expect(mappedComponents[0]).toHaveProperty('bindingEnergy');
    expect(mappedComponents[0].kineticEnergy.value).toBeGreaterThan(0);
    expect(mappedComponents[0].bindingEnergy.value).toBeLessThan(0);
    expect(mappedComponents[0].type).toStrictEqual('LA');
    expect(mappedComponents[0].assignment).toStrictEqual('Mo 3d MoS2 2H');
    expect(mappedComponents[0]).toHaveProperty('type');
    expect(mappedComponents[0]).toHaveProperty('area');
  });
});
