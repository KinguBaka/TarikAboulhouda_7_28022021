// Imports
const express = require('express');
const usersCtrl = require('./routes/usersCtrl');
const messageCtrl = require('./routes/messageCtrl');

// Routes
exports.router = ( function() {
    const apiRouter = express.Router();

    // Users routes
    apiRouter.route('/users/signup').post(usersCtrl.signup);
    apiRouter.route('/users/login').post(usersCtrl.login);
    apiRouter.route('/users/me').get(usersCtrl.getUserProfile);

    // Messages routes 
    apiRouter.route('/messages/new').post(messageCtrl.createMessage);
    apiRouter.route('/messages/').get(messageCtrl.listMessage);

    return apiRouter;
})();