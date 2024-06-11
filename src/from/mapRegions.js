export function mapRegions(
  parsedBlockComment,
  sourceEnergy,
  energyUnits = 'eV',
) {
  const regions = [];

  if (parsedBlockComment.regions) {
    for (let region of parsedBlockComment.regions) {
      const newRegion = { ...region };
      if (newRegion?.background?.parameters?.kineticEnergyStart) {
        newRegion.background.parameters.kineticEnergyStart = {
          value: newRegion.background.parameters.kineticEnergyStart,
          units: energyUnits,
        };
        newRegion.background.parameters.bindingEnergyStart = {
          value:
            sourceEnergy -
            newRegion.background.parameters.kineticEnergyStart.value,
          units: energyUnits,
        };
      }
      if (newRegion?.background?.parameters?.kineticEnergyEnd) {
        newRegion.background.parameters.kineticEnergyEnd = {
          value: newRegion.background.parameters.kineticEnergyEnd,
          units: energyUnits,
        };
        newRegion.background.parameters.bindingEnergyEnd = {
          value:
            sourceEnergy -
            newRegion.background.parameters.kineticEnergyEnd.value,
          units: energyUnits,
        };
      }

      regions.push(newRegion);
    }
  }

  if (parsedBlockComment.regions) {
    return parsedBlockComment.regions;
  }
  return regions;
}
