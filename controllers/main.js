const {validationResult} = require('express-validator');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const controller = {
    index: (req, res) => {
        res.render('index')
    },
    store: (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            let valores = req.body;
            let validaciones = errors.array();
            res.render('index', {
                validaciones: validaciones,
                valores: valores
            })
        } 
            let userTologin = User.findByField('email', req.body.email);
            if (userTologin) {
                let valores = req.body;
                let validaciones = errors.array();
                return res.send('ya estas logueado')
            } 
                let userToCreate = {
                    ...req.body,
                    password: bcryptjs.hashSync(req.body.password, 10),
                    image: req.file.filename
                }
                User.create(userToCreate);
                return res.redirect('login');
            },
    login: (req, res) => {
        return res.render('../views/login.ejs')
    },
    processLogin: (req, res) => {
        let userToLogin = User.findByField('email', req.body.email);
        if(userToLogin) {
            let passwordOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if(passwordOk) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                res.redirect('userRegister'); 
            }
        }
        return res.render('../views/login.ejs', {
            validaciones: {
                email: { 
                    msg: 'no se encuentra el email'
                }
            }
        })
        
    },
    profile: (req, res) => {
        return res.render('../views/userRegister.ejs', {
            user: req.session.userLogged
        })
    },

    logout: (req, res) => {
        req.session.destroy();
        console.log.apply(req.session);
        return res.redirect('login');
    }
            
        }


module.exports = controller;