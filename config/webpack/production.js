process.env.NODE_ENV = process.env.NODE_ENV || "production"

const environment = require("./environment")
environment.plugins.get("UglifyJs").options.uglifyOptions.ecma = undefined

environment.loaders.get("babel").use = {
  loader: "babel-loader",
  options: {
    presets: [
      [
        "env",
        {
          "modules": false
        }
      ],
      "react",
      "stage-0"
    ],
    plugins: [
      ["transform-runtime"]
    ]
  }
}

module.exports = environment.toWebpackConfig()
