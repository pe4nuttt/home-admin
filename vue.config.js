module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/home-access-admin/" : "/",
  devServer: {
    disableHostCheck: true
  },
  transpileDependencies: ["vuetify"],
  runtimeCompiler: true,
  configureWebpack: {
    performance: {
      hints: false
    },
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000
      }
    }
  }
};
