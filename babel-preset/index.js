module.exports = function babelPreset(
  api
){
  const isTestingEnv = api.env('test')
  const isProdEnv = api.env('production')
  const isDevEnv = api.env('development') || (!isProdEnv && !isTestingEnv)

  return {
    presets: [
      isTestingEnv && [ require('@babel/preset-env').default, { targets: { node: 'current' } } ],
      [ require('@babel/preset-react').default, { development: isDevEnv || isTestingEnv, useBuiltIns: true } ],
      [ require('@babel/preset-typescript').default, { isTSX: true, allExtensions: true } ],
    ]
  }
}
