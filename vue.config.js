module.exports = {
	transpileDependencies: [ 'vuetify' ],
	chainWebpack: (config) => {
		config.performance.maxEntrypointSize(400000).maxAssetSize(400000);
	}
	/* devServer: {
    port: '8080',
    host: '0.0.0.0',
    hotOnly: true,
    disableHostCheck: true,
    clientLogLevel: 'warning',
    inline: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
  } */
};
