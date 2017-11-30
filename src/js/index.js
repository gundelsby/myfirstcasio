const context = new AudioContext()
const oscillator = context.createOscillator()

oscillator.connect(context.destination)
oscillator.start(context.currentTime)
oscillator.stop(context.currentTime + 3)
