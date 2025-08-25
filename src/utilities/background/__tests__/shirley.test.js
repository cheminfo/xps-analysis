import { expect, test } from 'vitest';

import { shirley } from '../shirley';

test('shirley', () => {
  const data = {
    x: [1, 2, 3, 4],
    y: [1, 2, 3, 5],
  };
  const options = {
    slope: 1,
    intercept: 0,
  };

  const result = shirley(data, options);

  expect(result.background).toStrictEqual({
    x: [1, 2, 3, 4],
    y: [1, 2, 3, 4],
  });
  expect(result.corrected).toStrictEqual({
    x: [1, 2, 3, 4],
    y: [0, 0, 0, 1],
  });
});
