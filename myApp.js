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


// Export early to avoid circular dependency issues with server.js requiring this file
module.exports = app;

//prevent MIME Stiffing
app.use(helmet.noSniff());

//stop untrusted https
app.use(helmet.ieNoOpen());

//use https:
var timeInSeconds = 90*24*60*60;
app.use(helmet.hsts(
  {
    maxAge:timeInSeconds,
    force: true
  }
));

//disable DNS Prefetching

app.use(helmet.dnsPrefetchControl());

// disable chache
app.use(helmet.noCache());

//add content secuirty
app.use(helmet.contentSecurityPolicy({ directives: { defaultSrc: ["'self'"], scriptSrc: ["'self'", "trusted-cdn.com"] }} ))

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