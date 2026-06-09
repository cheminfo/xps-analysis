import { JSGraph as OriginalJSGraph } from 'common-spectrum';

import { getComponentsAnnotations } from './jsgraph/getComponentsAnnotations.js';
import { getRegionsAnnotations } from './jsgraph/getRegionsAnnotations.js';

export {
  AnalysesManager,
  Analysis,
  fromJcamp,
  toJcamp,
  toJcamps,
} from 'common-spectrum';

export { fromVamas } from './from/fromVamas.js';

export { peakPicking } from './peakPicking.js';

export { references } from './references.js';

export const JSGraph = {
  ...OriginalJSGraph,
  getRegionsAnnotations,
  getComponentsAnnotations,
};

export { predictUsingHoseCodes } from './utilities/prediction/predictUsingHoseCodes.js';
export { predictUsingAI } from './utilities/prediction/predictUsingAI.js';
export { predictPolymer } from './utilities/prediction/predictPolymer.js';
