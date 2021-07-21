export function mapComponents(parsedBlockComment, energyUnits = 'eV') {
  const components = [];
  if (parsedBlockComment.components) {
    for (let component of parsedBlockComment.components) {
      components.push({
        energy: {
          value: component.position.value,
          units: energyUnits,
        },
        name: component.name,
        type: component.shape.kind,
        shapeParameters: {
          gamma: component.fwhm.value,
        },
        area: component.area.value,
      });
    }
  }
  return components;
}
