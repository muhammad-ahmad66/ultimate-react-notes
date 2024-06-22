const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://www.omdbapi.com",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // remove /api prefix when requesting from target
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log("Proxying request:", req.url);
      },
      onProxyRes: (proxyRes, req, res) => {
        console.log("Received response from target:", proxyRes.statusCode);
        proxyRes.on("data", (data) => {
          console.log("Response data:", data.toString());
        });
      },
    })
  );
};
