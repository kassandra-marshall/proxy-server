import NextCors  from 'nextjs-cors';
const { createProxyMiddleware } = require('http-proxy-middleware');

const apiProxy = createProxyMiddleware({
    target: "https://www.googleapis.com/books/v1/volumes",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "" // strip "/api" from the URL
    },
    onProxyRes(proxyRes) {
      proxyRes.headers["access-control-allow-origin"] = "*",
      proxyRes.headers["access-control-allow-methods"] = "DELETE, POST, GET, OPTIONS, PUT, PATCH",
      proxyRes.headers["access-control-allow-headers"] = "Origin, X-Requested-With, Content-Type, Accept"
    }
  });
  
  // Expose the proxy on the "/api/*" endpoint.
  export default async function (req, res) {
    await NextCors(req, res, {
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      origin: '*',
      optionsSuccessStatus: 200,
    })
    return apiProxy(req, res);
  };

// const express = require('express');
// const request = require('request');

// const app = express();
// const API_URL = 'https://www.googleapis.com/books/v1/volumes' 

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

// app.get('/api', (req, res) => {
//     console.log('get request')
//   request(
//     { url: `${API_URL}` },
//     (error, response, body) => {
//       if (error || response.statusCode !== 200) {
//         return res.status(500).json({ type: 'error', message: error.message });
//       }

//       res.json(JSON.parse(body));
//     }
//   );
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`listening on ${PORT}`));