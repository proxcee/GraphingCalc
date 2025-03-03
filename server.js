const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Proxy all requests while keeping the URL static
app.use(
  "/",
  createProxyMiddleware({
    target: "https://www.google.com",
    changeOrigin: true,
    selfHandleResponse: true, // This ensures we can modify responses
    onProxyRes: (proxyRes, req, res) => {
      let body = "";
      proxyRes.on("data", (chunk) => {
        body += chunk;
      });
      proxyRes.on("end", () => {
        // Rewrite all links so they don't show Google URLs
        body = body.replace(/https:\/\/www\.google\.com/g, req.headers.host);
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        res.end(body);
      });
    },
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
