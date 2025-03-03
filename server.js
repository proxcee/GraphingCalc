const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Proxy all requests to Google
app.use(
  "/",
  createProxyMiddleware({
    target: "https://www.google.com",
    changeOrigin: true,
    onProxyRes: (proxyRes, req, res) => {
      // If you need to modify headers, you can do it here
      // For example, to remove the "x-frame-options" header:
      delete proxyRes.headers["x-frame-options"];
    },
    onError: (err, req, res) => {
      console.error("Proxy Error:", err);
      res.status(500).send("Proxy Error");
    },
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
