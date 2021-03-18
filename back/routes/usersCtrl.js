// Imports
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');
const { check, validationResult } = require('express-validator');

// Constants
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/


// Routes
module.exports = {

    signup: (req, res) => {
        /*// Validator
        check('email').isEmail(),
        check('password').isLength({min: 5}),
        check('username').isLength({min: 3}),
        check('bio').optional()
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }*/

        // Params
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        var bio = req.body.bio;

        if (email == null || username == null || password == null) {
            return res.status(400).json({ 'error': 'Paramétre(s) manquant(s) '});
        }

        // Verify pseudo length, mail regex, password etc.
        if (username.length >= 13 || username.length <= 4) {
            return res.status(400).json({ 'error': 'Mauvais username renseigné (doit faire entre 5 - 12 caractéres) '});
        }
        
        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({ 'error': 'Email renseigné incorrect'});
        }

        if (!PASSWORD_REGEX.test(password)) {
            return res.status(400).json({ 'error': 'Mot de passe invalide : Le mot de passe doit comporter entre 4 et 8 lettres et inclure au moins un chiffre numérique. '});
        }

        models.User.findOne({
            attributes: ['email'],
            where: { email : email }
        })
        .then(userFound => {
            if (!userFound) {
                bcrypt.hash(password, 5, function(err, bcryptedPassword){
                    var newUser = models.User.create({
                        email: email,
                        username: username,
                        password: bcryptedPassword,
                        bio: bio,
                        isAdmin: 0
                    })
                    .then(newUser => {
                        return res.status(201).json({ 'userId' : newUser.id })
                    })
                    .catch(err => res.status(500).json({ 'error': "Impossible d'ajouter l'utilisateur: " + err}));
                });
            } else {
                return res.status(409).json({ 'error' : "L'utilisateur existe déja"})
            }
        })
        .catch(err => {
            return res.status(409).json({ 'error' : "Impossible de vérifier l'utilisateur: " + err})
        });
    },


    login: (req, res) => {
        // Params
        var email = req.body.email;
        var password = req.body.password;

        if (email == null || password == null) {
            return res.status(400).json({ 'error': 'Paramétre(s) manquant(s)' });
        }
        // TODO Verify mail regex, password lenght.

        models.User.findOne({
            where : {email: email }
        })
        .then(userFound => {
            if (userFound) {
                bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                    if (resBycrypt) {
                        return res.status(200).json({
                            'userId': userFound.id,
                            'token': jwtUtils.generateTokenForUser(userFound)
                        });
                    }else {
                        return res.status(403).json({ 'error' : 'Mot de passe incorrect' });
                    }
                })
            } else {
                return res.status(404).json({ 'error' : 'Utilisateur introuvable' });
            }
        })
        .catch(err => {
            return res.status(500).json({'error' : "Impossible de vérifier l'utilisateur"})
        });
    },

    getUserProfile: (req, res) => {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        if (userId < 0) {
            return res.status(400).json({ 'error': 'Mauvais token' });
        }
        
        models.User.findOne({
            attributes: ['id', 'email', 'username', 'bio'],
            where: { id: userId }
        }).then(user => {
            if (user) {
                res.status(201).json(user);
            } else {
                res.status(404).json({ 'error' : 'Utilisateur introuvable'})
            }
        }).catch(err => {
            res.status(500).json({ 'error' : "impossible de récupérer l'utilisateur: " + err})
        })
    },

    deleteUserProfile : (req, res) =>{
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        if (userId < 0) {
            return res.status(400).json({ 'error': 'Mauvais token' });
        }

        models.User.findOne({
            attributes: ['id'],
            where: { id: userId }
        }).then(userFound => {
            if (userFound) {
                userFound.destroy();
                res.status(200).json({ message : " Utilisateur supprimé !"})
            } else {
                res.status(404).json({ 'error' : 'Utilisateur introuvable'})
            }
        }).catch(err => res.status(400).json({ 'error' : " Impossible de supprimer l'utilisateur "+ err }));
    },

    modifUserProfil : (req, res) => {
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        // Params
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        var bio = req.body.bio;

        // Verify pseudo length, mail regex, password etc.
        /*if (username.length >= 13 || username.length <= 4) {
            return res.status(400).json({ 'error': 'Mauvais username renseigné (doit faire entre 5 - 12 caractéres) '});
        } else if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({ 'error': 'Email renseigné incorrect'});
        } else if (!PASSWORD_REGEX.test(password)) {
            return res.status(400).json({ 'error': 'Mot de passe invalide : Le mot de passe doit comporter entre 4 et 8 lettres et inclure au moins un chiffre numérique. '});
        }*/

        var value = {email : email, username : username, password : password, bio : bio };

        models.User.findOne({
            where: { id: userId }
        })
        .then(userFound => {
            if(userFound) {
                models.User.update(
                    value,
                    {where : {id : userFound.id}}
                )
                .then(userModif => {
                    console.log(userModif);
                    if (userModif == 1) {
                        return res.status(201).json({'message' : 'Utilisateur modifié '});
                    } else {
                        return res.status(500).json({'error' : "Impossible de modifier l'utilisateur"});
                    }
                })
            } else {
                res.status(404).json({ 'error' : 'Utilisateur introuvable'});
            }
        })
        .catch(err => {
            return res.status(409).json({ 'error' : "Impossible de vérifier l'utilisateur: " + err})
        });
    }
};