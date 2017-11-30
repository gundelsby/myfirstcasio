export default (container, scope) => {
  const canvas = container.querySelector('canvas')

  if (!canvas) {
    console.log('No canvas to draw a scope in, dummy!')
    return null
  }

  if (!scope) {
    console.log('No scope to draw, dummy!')
    return null
  }

  const context = canvas.getContext('2d')
  const {width, height} = canvas

  function draw () {
    const bufferLength = scope.frequencyBinCount
    let dataArray = new Uint8Array(bufferLength)

    requestAnimationFrame(draw)
    scope.getByteTimeDomainData(dataArray)

    context.fillStyle = 'rgb(0, 50, 0)'
    context.fillRect(0, 0, width, height)

    context.lineWidth = 2
    context.strokeStyle = 'rgb(240, 255, 240)'

    context.beginPath()

    var sliceWidth = width * 1.0 / bufferLength
    var x = 0

    for (var i = 0; i < bufferLength; i++) {
      var v = dataArray[i] / 128.0
      var y = v * height / 2

      if (i === 0) {
        context.moveTo(x, y)
      } else {
        context.lineTo(x, y)
      }

      x += sliceWidth
    }

    context.lineTo(width, height / 2)
    context.stroke()
  }

  draw()
}
