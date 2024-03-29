const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist/build"
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    module: {
        rules: [
            {
              test: /\.tsx?$/,
              loader: 'awesome-typescript-loader',
              exclude: /node_modules/
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
                // loader: 'file-loader',
                use: {
                    loader: "url-loader",
                    options: {
                      // Limit at 50k. Above that it emits separate files
                      limit: 50000,
                      mimetype: "application/font-woff",
                      // Output below fonts directory
                      name: "./fonts/[name].[ext]"
                    }
                }
            }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },
    plugins:[
       new HtmlWebpackPlugin({
          template: './index.html'
       })
    ]
};