const Express = require('express');
require('dotenv').config();
const preInitialization = require('./pre-init');
const registerRoutes = require('./server/routes');

const app = Express();

preInitialization(app);
registerRoutes(app);
// app.use(secureRoute({ global: true }));

const port = 3003;

app.listen(
  { port },
  () => void console.log(`🚀 - Server listening on Port : ${port}`)
);
