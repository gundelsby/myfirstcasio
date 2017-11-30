function createKey (name) {
  const button = document.createElement('button')

  button.className = 'nrk-button'
  if (name.includes('#')) {
    button.classList.add('nrk-color-invert')
  }

  button.textContent = name

  return button
}

function transpose (frequency, steps) {
  return frequency * Math.pow(2, steps / 12)
}

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const C3_FREQ = transpose(220, -9)

export default (container, callback) => {
  notes.forEach((note, index) => {
    const key = createKey(note)
    const frequency = transpose(C3_FREQ, index)
    key.addEventListener('click', () => {
      callback(frequency)
    })

    container.appendChild(key)
  })
}
