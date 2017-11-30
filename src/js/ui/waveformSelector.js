function createButton (text, callback) {
  const button = document.createElement('button')

  button.className = 'nrk-button'
  button.textContent = text
  button.addEventListener('click', callback)

  return button
}
export default (waveforms, container, callback) => {
  waveforms.forEach((waveform) => {
    const button = createButton(waveform.name, () => {
      callback(waveform)
    })
    container.appendChild(button)
  })
}
