import path from 'path';
import merge from 'merge';

export default function (options) {
    const env = process.env.BABEL_ENV || process.env.NODE_ENV || process.env.APP_ENV;
    const development = typeof options.development === 'undefined'
        ? env !== 'production'
        : options.development;

    options = merge.recursive({

        // Environment
        name: 'main',
        development: development,
        env: env,

        // HMR
        domain: process.env.APP_URL,
        hot: options.devServer === false ? development : process.argv.indexOf('--inline') !== -1,

        // Filenames and paths
        filenames: development ? '[name]' : '[name].[hash]',
        devServer: 'http://localhost:8080',
        sourcePath: 'resources/assets/js',
        outputPath: 'public/builds/',

        // Frameworks
        react: true,
        angular: false,

        // Other options
        linting: false,
        typescript: false,
        inlineLimit: 50000,

        // Loaders
        loaders: {
            js: 'babel-loader',
            css: development ? 'css-loader' : 'css-loader!postcss-loader',
            ts: 'awesome-typescript-loader?module=commonjs',
        },

    }, options);

    // Switch extensions for Typescript
    if (options.typescript) {
        options.sourcePath = options.sourcePath.replace('js', 'ts');
    }

    // Uniformize source path and entry point
    options.entry = options.sourcePath;
    options.sourcePath = path.resolve(path.dirname(options.sourcePath));

    return options;
};
