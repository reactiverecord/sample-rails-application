const { environment } = require("@rails/webpacker")
const erb =  require("./loaders/erb")

/* Remove CSS */
environment.config.delete("devtool")
environment.loaders.delete("css")
environment.loaders.delete("sass")
environment.loaders.delete("moduleCss")
environment.loaders.delete("moduleSass")
environment.plugins.delete("ExtractText")

const babelLoader = environment.loaders.get("babel")

/* Babel */
babelLoader.use = {
  loader: "babel-loader",
  options: {
    presets: [
      [
        "env",
        {
          "modules": false,
          "targets": {
            "browsers": ["last 1 Chrome version"]
          },
          include: [
            "transform-es2015-arrow-functions"
          ]
        }
      ],
      "react",
      "stage-0"
    ],
    plugins: [
      [
        "transform-es2015-modules-commonjs",
        "transform-runtime"
      ]
    ]
  }
}

/* Include ReactiveRecord */
babelLoader.exclude = /node_modules(?!\/reactiverecord).*$/
/* Include ERB */
environment.loaders.append("erb", erb)

module.exports = environment
