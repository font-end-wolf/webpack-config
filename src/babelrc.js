module.exports = {
    cacheDirectory: true,
    presets:        ['es2015', 'react', 'stage-0'],
    plugins:        ['transform-decorators-legacy'],
    env:            {
        development: {
            presets: ["react-hmre"]
        },
        production:    {
            ast:     false,
            compact: true
        }
    }
};
