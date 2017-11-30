import {createWaveformDescription} from './waveforms.js'

const name = 'FFT, who gets that? :S'

export default () => {
  const real = new Float32Array([0, 1, 1, 1, 1, 1])
  const imag = new Float32Array([0, 0, 0.33, 0.2, 0.08, 0.02])

  return createWaveformDescription(name, 'custom', {real, imag})
}
