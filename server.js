const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/', createProxyMiddleware({
  target: 'https://www.google.com', // Change this if you want to proxy a different site
  changeOrigin: true,
  secure: false
}));

app.listen(3000, () => {
  console.log('Proxy running on port 3000');
});

