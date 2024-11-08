// Michael Stone - u21497682
const path = require("path");

module.exports = {
    entry: "./frontend/src/index.js",
    
    output: {
        path: path.resolve(__dirname, 'frontend', 'public'),
        filename: "bundle.js"
    },

    mode: "development",
    
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/, // Add this rule for CSS files
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader"
                ]
            }
        ]
    },

    devServer: {
        historyApiFallback: true, // This ensures that all routes are served by index.html
    }
}
