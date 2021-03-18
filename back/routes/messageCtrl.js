// Imports
const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const fs = require('fs');

// Constants
const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;
const ITEMS_LIMIT = 50;

// Routes

module.exports = {

    createMessage: (req, res) => {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        
        // Params
        var title = req.body.title;
        var content = req.body.content;
        var attachement = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

        if (title == null || content == null ) {
            return res.status(400).json({ 'error' : 'Paramétres manquants'});
        }

        if (title.length < TITLE_LIMIT || content.length < CONTENT_LIMIT ) {
            return res.status(400).json({ 'error' : 'Titre ou contenu trop court '});
        }

        models.User.findOne({
            where: { id: userId }
        })
        .then(userFound =>{
            if(userFound) {
                models.Message.create({
                    title : title,
                    content : content,
                    attachement : attachement,
                    likes : 0,
                    UserId : userFound.id
                })
                .then(newMessage => {
                    if (newMessage) {
                        return res.status(201).json(newMessage);
                    } else {
                        return res.status(500).json({'error' : 'Impossible de poster un message'});
                    }
                });
            } else {
                res.status(404).json({ 'error' : 'Utilisateur introuvable'});
            }
        })
        .catch(err => {
            return res.status(409).json({ 'error' : "Impossible de vérifier l'utilisateur: " + err})
        });

    },

    listMessage: (req, res) => {
        // Params 
        var fields = req.query.fields;
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var order = req.query.order;

        if (limit > ITEMS_LIMIT) {
            limit = ITEMS_LIMIT;
        }

        models.Message.findAll({
            order : [(order !=null) ? order.split(':') : ['title', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit: null,
            offset: (!isNaN(offset)) ? offset : null,
            include : [{
                model: models.User,
                attributes: [ 'username' ]
            }]
        })
        .then(message => {
            if (message) {
                res.status(200).json(message);
            } else {
                res.status(404).json({'error' : 'Messages introuvables'});
            }
        })
        .catch(err =>{
            res.status(500).json({ 'error' : 'Champs invalides ' + err});
        })
    },

    modifMessage: (req, res) => {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        // Params
        var title = req.body.title;
        var content = req.body.content;
        var attachement = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

        if (title == null || content == null ) {
            return res.status(400).json({ 'error' : 'Paramétres manquants'});
        }

        if (title.length < TITLE_LIMIT || content.length < CONTENT_LIMIT ) {
            return res.status(400).json({ 'error' : 'Titre ou contenu trop court '});
        }

        var value = { title : title, content : content, attachement : attachement };

        models.User.findOne({
            where: { id: userId }
        })
        .then(userFound =>{
            if(userFound) {
                models.Message.update(
                    value,
                    {where : {id: req.params.id }}
                )
                .then(modifMessage => {
                    if (modifMessage == 1) {
                        return res.status(201).json({'message' : 'Message modifié '});
                    } else {
                        return res.status(500).json({'error' : 'Impossible de modifier le message'});
                    }
                });
            } else {
                res.status(404).json({ 'error' : 'Utilisateur introuvable'});
            }
        })
        .catch(err => {
            return res.status(409).json({ 'error' : "Impossible de vérifier l'utilisateur: " + err})
        });
    },

    deleteMessage: (req, res) => {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        var userIsAdmin = jwtUtils.UserIsAdmin(headerAuth);
        
        models.Message.findOne({where : {id : req.params.id }})
        .then(message => {
            if (userId === message.UserId || userIsAdmin === true ) {
                const filename = sauce.imageUrl.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    message.destroy()
                    res.status(200).json({ message : " Message supprimé !"});
                })  
            } else {
                res.status(404).json({ 'error' : 'Utilisateur non autorisé'});
            }
        })
        .catch(err => { 
            return res.status(409).json({ 'error' : "Message introuvable : " + err})
        });
    }

};