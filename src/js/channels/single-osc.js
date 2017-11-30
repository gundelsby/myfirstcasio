import waveformsFactory from '../waveforms/waveforms.js'
import scope from '../analysers/scope.js'
import scopeUI from '../ui/scope.js'
import waveformUI from '../ui/waveformSelector.js'

const waveforms = waveformsFactory()

export default (context, bus, uiContainer) => {
  const output = context.createGain()
  let oscillator = null
  let currentWaveform = waveforms[0]
  let currentFrequency = 440
  let currentGain = 0.5

  output.connect(bus)

  scopeUI(uiContainer, scope(context, output))

  waveformUI(waveforms, uiContainer.querySelector('.waveform-picker'), (waveform) => {
    currentWaveform = waveform
    play()
  })

  function play () {
    stop()

    output.gain.value = currentGain
    oscillator = context.createOscillator()
    if (currentWaveform.waveform) {
      const {real, imag, constraints} = currentWaveform.waveform
      const wave = context.createPeriodicWave(real, imag, constraints)
      oscillator.setPeriodicWave(wave)
    } else {
      oscillator.type = currentWaveform.type
    }
    oscillator.connect(output)
    oscillator.frequency.value = currentFrequency
    oscillator.start()
  }

  function stop () {
    console.log(oscillator)
    if (oscillator) {
      oscillator.stop()
      oscillator = null
    }
  }

  function setFrequency (frequency) {
    currentFrequency = frequency
    if (oscillator) {
      oscillator.frequency.value = frequency
    }
  }

  return {
    play: (frequency, amplitude) => {
      currentFrequency = frequency
      currentGain = amplitude
      play()
    },
    stop: () => {
      stop()
    },
    setFrequency: (frequency) => {
      setFrequency(frequency)
    }
  }
}
