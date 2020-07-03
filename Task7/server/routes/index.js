const express = require('express');
const login = require('./auth/login.route');
const signup = require('./auth/signup.route');
const Utils = require('../utils');

module.exports = function registerRoutes(app) {
  const router = express.Router();

  // auth routes
  app.use('/auth', [login, signup]);

  //dummy route for authentication

  router.get('/user/me', Utils.secureRoute, (req, res) => {
      res.json({
          success: true,
          message: 'Route is authenticated',
      });
  });

  app.use('/api', router);
};
