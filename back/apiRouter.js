// Imports
const express = require('express');
const usersCtrl = require('./routes/usersCtrl');

// Routes
exports.router = ( function() {
    const apiRouter = express.Router();

    // Users routes
    apiRouter.route('/signup').post(usersCtrl.signup);
    apiRouter.route('/login').post(usersCtrl.login);

    return apiRouter;
})();