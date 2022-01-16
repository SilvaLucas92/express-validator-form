const express = require('express');
const router = express.Router();
const controller = require('../controllers/main.js')

const {body} = require('express-validator');
const userValidator = [
    body('nya')
        .notEmpty().withMessage('Ingrese su nombre'),
    body('email')
        .notEmpty().withMessage('Ingrese su email').bail()
        .isEmail(),
    body('edad')
        .notEmpty().withMessage('Ingrese su edad')

]

router.get('/', controller.index);
router.post('/registrar', userValidator, controller.store)


module.exports= router;