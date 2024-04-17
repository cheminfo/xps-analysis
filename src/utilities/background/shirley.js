

export function shirley(data, options = {}) {
  const { slope = 1, intercept = 0 } = options

  const { x, y } = data

  const background = {
    x,
    y: new Array(x.length).fill(0)
  }

  const corrected = {
    x,
    y: new Array(x.length).fill(0)
  }

  for (let i = 0; i < x.length; i++) {
    const yValue = y[i]
    background.y[i] = slope * x[i] + intercept;
    corrected.y[i] = yValue - background.y[i]
  }

  return { background, corrected }
}