import simpleSquare from './weird.js'

export function createWaveformDescription (name, type, data) {
  return { name, type, data }
}
export default () => {
  const waveforms = []

  waveforms.push(simpleSquare())
  waveforms.push(createWaveformDescription('Sine', 'sine', null))
  waveforms.push(createWaveformDescription('Square', 'square', null))
  waveforms.push(createWaveformDescription('Sawtooth', 'sawtooth', null))
  waveforms.push(createWaveformDescription('Triangle', 'triangle', null))

  return waveforms.map(({name, type, data}) => {
    return {
      name,
      type,
      waveform: data
    }
  })
}
