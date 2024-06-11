import { JSGraph as OriginalJSGraph } from 'common-spectrum';

import { getComponentsAnnotations } from './jsgraph/getComponentsAnnotations.js';
import { getRegionsAnnotations } from './jsgraph/getRegionsAnnotations.js';

export {
  Analysis,
  AnalysesManager,
  fromJcamp,
  toJcamp,
  toJcamps,
} from 'common-spectrum';

export { fromVamas } from './from/fromVamas';

export { peakPicking } from './peakPicking';

export { references } from './references';

export const JSGraph = {
  ...OriginalJSGraph,
  getRegionsAnnotations,
  getComponentsAnnotations,
};

export { predictUsingHoseCodes } from './utilities/prediction/predictUsingHoseCodes';
export { predictUsingAI } from './utilities/prediction/predictUsingAI';
