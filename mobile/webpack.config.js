const webpack = require("@nativescript/webpack");
const { VueLoaderPlugin } = require("vue-loader");
const { resolve } = require("path");

module.exports = (env) => {
  webpack.init(env);

  webpack.chainWebpack((config) => {
    config.plugin("VueLoaderPlugin").use(VueLoaderPlugin);

    config.module
      .rule("vue")
      .test(/\.vue$/)
      .use("vue-loader")
      .loader("vue-loader")
      .options({
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("ns-"),
        },
      });

    config.plugin("DefinePlugin").tap((args) => {
      Object.assign(args[0], {
        __VUE_OPTIONS_API__: false,
        __VUE_PROD_DEVTOOLS__: false,
        "global.ENV": JSON.stringify({
          VITE_API_URL: process.env.VITE_API_URL,
        }),
      });
      return args;
    });
  });

  webpack.Utils.addCopyRule({
    from: resolve(__dirname, "src/assets"),
    to: resolve(webpack.Utils.platform.getDistPath(), "assets"),
    context: resolve(__dirname, "src"),
  });

  return webpack.resolveConfig();
};
