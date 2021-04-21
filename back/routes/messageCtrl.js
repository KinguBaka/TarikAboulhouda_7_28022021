// Imports
const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const fs = require('fs');
const { each } = require('async');
const { stringify } = require('querystring');
const { nextTick } = require('process');

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
        if (req.file) {
            var attachement = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        }

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
                    attachement,
                    likes : 0,
                    usersLiked : [],
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
        if (req.body.title) {
            var title = req.body.title;
            if (title.length < TITLE_LIMIT ) {
                return res.status(400).json({ 'error' : 'Titre trop court '});
            }
        }
        
        if (req.body.content) {
           var content = req.body.content;
            if (content.length < CONTENT_LIMIT ) {
                return res.status(400).json({ 'error' : 'Contenu trop court '});
            }
        }

        if (req.file) {
            var attachement = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        }

        if (title === null && content === null && attachement === null) {
            return res.status(400).json({ 'error' : 'Paramétres manquants'});
        }

        models.User.findOne({
            where: { id: userId }
        })
        .then(userFound =>{
            if(userFound) {
                models.Message.findOne({where : {id : req.params.id }})
                .then(message =>{
                    if (req.attachement) {
                        const filename = message.attachement.split("/images/")[1];
                        fs.unlink(`public/images/${filename}`, () =>
                            console.log("Image supprimée")
                        )
                    }
                })
                models.Message.update({
                    title:title,
                    content: content,
                    attachement: attachement
                    },
                    {where : {id: req.params.id , UserId: userFound.id}}
                )
                .then(modifMessage => {
                    console.log(modifMessage)
                    if (modifMessage == 1) {
                        return res.status(201).json({'message' : 'Message modifié '});
                    } else {
                        return res.status(500).json({'error' : 'Impossible de modifier le message'});
                    }
                })
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
                if (message.attachement) {
                    const filename = message.attachement.split("/images/")[1];
                    fs.unlink(`public/images/${filename}`, () => {
                        message.destroy()
                        res.status(200).json({ message : " Message supprimé et attachement supprimé !"}); 
                    })
                } else {
                    message.destroy()
                    res.status(200).json({ message : " Message supprimé !"});
                }
            } else {
                res.status(404).json({ 'error' : 'Utilisateur non autorisé'});
            }
        })
        .catch(err => { 
            return res.status(409).json({ 'error' : "Message introuvable : " + err})
        });
    },

    likeMessage: (req, res) => {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        var likeStatus = req.body.like;
        
        models.User.findOne({
            where: { id: userId }
        })   
        .then(userFound =>{
            if (userFound) {
                models.Message.findOne({ where : {id : req.params.id }})
                .then(message => {
                    if (likeStatus == 1) {
                        var likes = message.likes + 1;
                        if (message.usersLiked ) {
                            var usersLiked = Array.from(message.usersLiked);
                        } else {
                            var usersLiked = [];
                        }
                        usersLiked.push(userId)
                        var value = { likes: likes, usersLiked: usersLiked};
                        models.Message.update(
                            value,
                            { where : { id: req.params.id }}
                        )
                        .then(() => res.status(200).json( { message: "Vous avez like ce message !" }))
                        .catch(err => res.status(400).json({ 'error' : "Vous n'avez pas pu liker ce message : " + err }));
                    }
                    if (likeStatus == 0) {
                        var likes = message.likes - 1;
                        var usersLiked = Object.values(message.usersLiked);
                        var index = usersLiked.indexOf(userId);
                        usersLiked.splice(index, 1);
                        var value = { likes: likes, usersLiked: usersLiked };
                        models.Message.update(
                            value,
                            { where : { id: req.params.id }}
                        )
                        .then(() => res.status(200).json({ message: "Like annulé !" }))
                        .catch((err) => res.status(400).json({ 'error' : "Vous n'avez pas pu annuler votre like : "+ err }))
                    }
                })
            } else {
                res.status(404).json({ 'error' : 'Utilisateur introuvable'});
            }
        })
        .catch(err => {
            return res.status(409).json({ 'error' : "Impossible de vérifier l'utilisateur : " + err})
        });
    }

};