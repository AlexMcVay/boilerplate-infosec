const express = require('express');
const app = express();

// Security: Helmet (v3.21.3) — add your helmet middleware configurations below as you progress
const helmet = require('helmet');

// Hide X-Powered-By header to reduce fingerprinting
app.use(helmet.hidePoweredBy());

// prevent people adding frames
app.use(helmet.frameguard({
  action: 'deny',
}));

// sanitize a users input to prevent XSS files
app.use(helmet.xssFilter());

module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
