export default (context, source) => {
  const scope = context.createAnalyser()

  scope.fftSize = 2048
  source.connect(scope)

  return scope
}
