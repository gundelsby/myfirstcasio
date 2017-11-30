import singleOsc from './channels/single-osc.js'
import keyboard from './ui/keyboard.js'

const context = new AudioContext()
const masterOut = context.createGain()
masterOut.connect(context.destination)

masterOut.gain.value = 0.5

const channels = Array.from(document.querySelectorAll('.channel')).map((channelContainer) => {
  return singleOsc(context, masterOut, channelContainer)
})

channels.forEach((channel, index) => {
  channel.play(55 * (index + 1), 1 / channels.length)
  setTimeout(() => {
    console.log('stopping channel #', index, channel)
    channel.stop()
  }, 1500)
})

// panic button
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('panic')) {
    channels.forEach((channel) => {
      channel.stop()
    })
  }
})

// create keyboard
keyboard(document.querySelector('.keyboard'), (frequency) => {
  channels.forEach((channel, index) => {
    channel.play(frequency * (index + 1), (1 / channels.length) / (1 + index))
  })
})

console.log('all done')
