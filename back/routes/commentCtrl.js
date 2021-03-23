// Imports
const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');

// Constants
const CONTENT_LIMIT = 4;
const ITEMS_LIMIT = 50;

// Routes

module.exports = {

    createComment: (req, res) => {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        
        // Params
        var content = req.body.content;

        if (content == null ) {
            return res.status(400).json({ 'error' : 'Paramétres manquants'});
        }

        if (content.length < CONTENT_LIMIT ) {
            return res.status(400).json({ 'error' : 'Titre ou contenu trop court '});
        }

        models.User.findOne({
            where: { id: userId }
        })
        .then(userFound =>{
            if(userFound) {
                models.Message.findOne({
                    where : { id: req.params.idMessage}
                })
                .then(message => {
                    models.Comment.create({
                        content : content,
                        UserId : userFound.id,
                        MessageId : message.id
                    })
                    .then(newComment => {
                        if (newComment) {
                            return res.status(201).json(newComment);
                        } else {
                            return res.status(500).json({'error' : 'Impossible de poster un commentaire'});
                        }
                    });
                })
                .catch(err => {
                    return res.status(409).json({ 'error' : "Impossible de trouver le message: " + err })
                })
            } else {
                res.status(404).json({ 'error' : 'Utilisateur introuvable'});
            }
        })
        .catch(err => {
            return res.status(409).json({ 'error' : "Impossible de vérifier l'utilisateur: " + err})
        });
    },

    listComment: (req, res) => {
        // Params 
        var fields = req.query.fields;
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var order = req.query.order;

        if (limit > ITEMS_LIMIT) {
            limit = ITEMS_LIMIT;
        }

        models.Comment.findAll({
            order : [(order !=null) ? order.split(':') : ['content', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit: null,
            offset: (!isNaN(offset)) ? offset : null,
            include : [{
                model: models.User,
                attributes: [ 'username' ]
            }],
            where : { MessageId : req.params.idMessage }
        })
        .then(comment => {
            if (comment) {
                res.status(200).json(comment);
            } else {
                res.status(404).json({'error' : 'Commentaires introuvables'});
            }
        })
        .catch(err =>{
            res.status(500).json({ 'error' : 'Champs invalides ' + err});
        })
    },

    modifComment: (req, res) => {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        // Params
        var content = req.body.content;
        if (content.length < CONTENT_LIMIT ) {
            return res.status(400).json({ 'error' : 'Contenu trop court '});
        }

        if (content === null) {
            return res.status(400).json({ 'error' : 'Paramétres manquants'});
        };

        var value = {content : content};

        models.User.findOne({
            where: { id: userId }
        })
        .then(userFound =>{
            if(userFound) {
                models.Message.findOne({
                    where : { id: req.params.idMessage}
                })
                .then(message => {
                    models.Comment.update(
                        value,
                        {where : {id: req.params.idComment, UserId: userFound.id, MessageId: message.id}}
                    )
                    .then(modifComment => {
                        if (modifComment == 1) {
                            return res.status(201).json({'message' : 'Commentaire modifié '});
                        } else {
                            return res.status(500).json({'error' : 'Impossible de modifier le commentaire'});
                        }
                    });
                })
                .catch(err => {
                    return res.status(409).json({ 'error' : "Impossible de trouver le commentair: " + err })
                })
            } else {
                res.status(404).json({ 'error' : 'Utilisateur introuvable'});
            }
        })
        .catch(err => {
            return res.status(409).json({ 'error' : "Impossible de vérifier l'utilisateur: " + err})
        });
    },

    deleteComment: (req, res) => {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        var userIsAdmin = jwtUtils.UserIsAdmin(headerAuth);
        
        models.Comment.findOne({where : {id : req.params.idComment }})
        .then(comment => {
            if (userId === comment.UserId || userIsAdmin === true ) {
                comment.destroy()
                res.status(200).json({ "message" : " Commentaire supprimé !"});
            } else {
                res.status(404).json({ 'error' : 'Utilisateur non autorisé'});
            }
        })
        .catch(err => { 
            return res.status(409).json({ 'error' : "Commentaire introuvable : " + err})
        });
    }

}