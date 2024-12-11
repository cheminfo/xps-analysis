/**
 * Creates annotations for jsgraph that allows to display the result of component picking
 * @param {Array<any>} regions
 * @param {object} [options={}]
 * @param {string} [options.fillColor='rgba(0,255,255,0.1)']
 * @param {string} [options.strokeColor='red']
 * @param {string} [options.mode='binding'] - 'binding' or 'kinetic'
 * @returns array
 */

export function getRegionsAnnotations(regions, options = {}) {
  const { fillColor = 'rgba(0,255,255,0.1)', strokeColor = 'red' } = options;
  regions = regions.filter((region) => region?.background);
  const annotations = regions.map((region) => {
    let annotation = {
      line: 1,
      type: 'rect',
      strokeColor,
      strokeWidth: 0,
      fillColor,
    };
    return getAnnotation(annotation, region, options);
  });
  return annotations;
}

function getAnnotation(annotation, region, options = {}) {
  const { mode = 'binding', showRegionID = true } = options;
  let labels = [];
  let line = 0;

  const energyStart =
    mode === 'kinetic'
      ? region.background.parameters.kineticEnergyStart.value
      : region.background.parameters.bindingEnergyStart.value;
  const energyEnd =
    mode === 'kinetic'
      ? region.background.parameters.kineticEnergyEnd.value
      : region.background.parameters.bindingEnergyEnd.value;

  if (showRegionID) {
    labels.push({
      text: region.regionID,
      size: '18px',
      anchor: 'middle',
      color: 'darkcyan',
      position: {
        x: (energyStart + energyEnd) / 2,
        y: '0px',
        dy: `${13 + line * 14}px`,
      },
    });
    line++;
  }

  annotation.labels = labels;
  annotation.position = [
    {
      x: energyStart,
      y: '0px',
    },
    {
      x: energyEnd,
      y: '1000px',
    },
  ];
  return annotation;
}
