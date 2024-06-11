import { JSGraph as OriginalJSGraph } from 'common-spectrum';

import { getAnnotations } from './jsgraph/getAnnotations';

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

export const JSGraph = { ...OriginalJSGraph, getAnnotations };

export { predictUsingHoseCodes } from './utilities/prediction/predictUsingHoseCodes';
