import { gsd } from 'ml-gsd';

/**
 * Allow
 * @param {object} spectrum
 * @param {object} [options={}]
 * @param {object} [options.gsd={}] - global spectra deconvolution options. Available options: http://mljs.github.io/global-spectral-deconvolution/#gsd
 * @returns {Array} Array of peaks
 */

export function peakPicking(spectrum, options = {}) {
  const { gsd: gsdOptions = { realTopDetection: true } } = options;
  let data = {
    x: spectrum.variables.x.data,
    y: spectrum.variables.y.data,
  };
  let peaks = gsd(data, gsdOptions);

  return peaks;
}
