// Imports
const express = require('express');
const usersCtrl = require('./routes/usersCtrl');
const messageCtrl = require('./routes/messageCtrl');
const commentCtrl = require('./routes/commentCtrl');
const multer = require('./utils/multer-config');

// Routes
exports.router = ( function() {
    const apiRouter = express.Router();

    // Users routes
    apiRouter.route('/users/signup').post(usersCtrl.signup);
    apiRouter.route('/users/login').post(usersCtrl.login);
    apiRouter.route('/users/me').get(usersCtrl.getUserProfile);
    apiRouter.route('/users/me').delete(usersCtrl.deleteUserProfile);
    apiRouter.route('/users/me').put(usersCtrl.modifUserProfil);

    // Messages routes 
    apiRouter.route('/messages/new').post(multer, messageCtrl.createMessage);
    apiRouter.route('/messages/').get(messageCtrl.listMessage);
    apiRouter.route('/messages/:id').put(messageCtrl.modifMessage);
    apiRouter.route('/messages/:id').delete(messageCtrl.deleteMessage);
    apiRouter.route('/messages/:id/like').post(messageCtrl.likeMessage);

    // Comments routes
    apiRouter.route('/messages/:id/comment').post(commentCtrl.createComment);

    return apiRouter;
})();