"use strict";
var path = require('path')
process.env.VUE_APP_VERSION = require('./package.json').version
module.exports = {
    configureWebpack: config => {
      config.resolve.alias["vue-mdc-adapter"] = "vue-mdc-adapter/dist/"
    },
    chainWebpack: config => {
      config.module
        .rule("scss")
        .oneOf("vue-modules")
        .use("sass-loader")
        .tap(args => {
          args.includePaths = ["./node_modules"]
          return args
        })
    },
    transpileDependencies:[/node_modules[/\\\\]vuetify[/\\\\]/],
    css: {
      loaderOptions: {
        sass: {
          includePaths: [path.resolve(__dirname, "node_modules")],
        },
      },
    },
    devServer: {
       disableHostCheck: true
    }
}
