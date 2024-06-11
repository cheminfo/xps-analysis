export function mapComponents(
  parsedBlockComment,
  sourceEnergy = undefined,
  energyUnits = 'eV',
) {
  const components = [];
  if (parsedBlockComment.components) {
    for (let component of parsedBlockComment.components) {
      components.push({
        ...component,
        kineticEnergy: {
          value: component.position.value,
          units: energyUnits,
        },
        bindingEnergy: {
          value: sourceEnergy - component.position.value,
          units: energyUnits,
        },
        assignment: component.componentID,
      });
    }
  }
  return components;
}
