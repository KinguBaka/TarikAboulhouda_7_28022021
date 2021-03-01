// Imports
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');

// Routes
module.exports = {

    signup: function(req, res) {
        // Params
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        var bio = req.body.bio;

        if (email == null || username == null || password == null) {
            return res.status(400).json({ 'error': 'Paramétre(s) manquant(s) '});
        }
        // TODO Verify pseudo length, mail regex, password etc.

        models.User.findOne({
            attributes: ['email'],
            where: { email : email }
        })
        .then(userfound => {
            if (!userfound) {
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


    login: function(req, res) {
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
        .then(userfound => {
            if (userfound) {
                bcrypt.compare(password, userfound.password, function(errBycrypt, resBycrypt) {
                    if (resBycrypt) {
                        return res.status(200).json({
                            'userId': userfound.id,
                            'token': jwtUtils.generateTokenForUser(userfound)
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
    }
};