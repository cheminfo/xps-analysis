/**
 * @typedef {Object} Component
 * @property {number} kineticEnergy
 * @property {number} bindingEnergy
 * @property {number} intensity
 * @property {number} kind
 * @property {number} assignment
 */

/**
 * Creates annotations for jsgraph that allows to display the result of component picking
 * @param {Array<Component>} components
 * @param {object} [options={}]
 * @param {string} [options.fillColor='green']
 * @param {string} [options.strokeColor='red']
 * @param {string} [options.showAssignment=true] Display the assignment
 * @param {Function} [options.creationFct] (annotation, component) => {}: callback allowing to add properties
 * @param {string} [options.mode='binding'] 'binding' or 'kinetic'
 * @returns array
 */

export function getComponentsAnnotations(components, options = {}) {
  const { fillColor = 'green', strokeColor = 'red', creationFct } = options;
  let annotations = components.map((component) => {
    let annotation = {
      line: 1,
      type: 'rect',
      strokeColor,
      strokeWidth: 0,
      fillColor,
    };
    if (creationFct) {
      creationFct(annotation, component);
    }
    return getAnnotation(annotation, component, options);
  });
  return annotations;
}

function getAnnotation(annotation, component, options = {}) {
  const { showAssignment = true, mode = 'binding' } = options;
  let labels = [];
  let line = 0;

  let energy =
    mode === 'kinetic'
      ? component.kineticEnergy.value
      : component.bindingEnergy.value;
  let intensity = component.intensity || '20px';
  if (showAssignment) {
    labels.push({
      text: component.assignment,
      size: '18px',
      anchor: 'middle',
      color: 'darkred',
      position: {
        x: energy,
        y: intensity,
        dy: `${23 + line * 14}px`,
      },
    });
    line++;
  }

  annotation.labels = labels;
  annotation.position = [
    {
      x: energy,
      y: intensity,
      dy: '10px',
      dx: '-1px',
    },
    {
      x: energy,
      y: intensity,
      dy: '5px',
      dx: '1px',
    },
  ];
  return annotation;
}
