const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
      createProxyMiddleware('/api/search', {
        target: 'https://openapi.naver.com',
        changeOrigin: true,
        pathRewrite: {
            '^/api/search': '',
        },
      })
    );
  
    app.use(
      createProxyMiddleware('/api/route', {
        target: 'https://naveropenapi.apigw.ntruss.com/',
        changeOrigin: true,
        pathRewrite: {
            '^/api/route': '',
        },
      })
    );
  };
