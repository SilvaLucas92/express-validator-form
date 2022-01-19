const express = require('express');
const router = express.Router();
const controller = require('../controllers/main.js');
const path = require('path');

//multer
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        let folder = path.join(__dirname, '../public/images');
        cb(null, folder);
    },
    filename: (req, file, cb) => {      
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, 'img - ' + uniqueSuffix + '-' + file.fieldname + path.extname(file.originalname))
    }
});
const fileUpload = multer({storage});

const {body} = require('express-validator');
const userValidator = [
    body('nya')
        .notEmpty().withMessage('Ingrese su nombre'),
    body('email')
        .notEmpty().withMessage('Ingrese su email').bail()
        .isEmail(),
    body('edad')
        .notEmpty().withMessage('Ingrese su edad'),
        body('password')
        .notEmpty().withMessage('Ingrese su password')
]
const guestMd = require('../middleware/guestMd.js');
const authMd = require('../middleware/authMd.js');

router.get('/', guestMd, controller.index);
router.post('/registrar',fileUpload.single('image'), userValidator, controller.store)

router.get('/login',  guestMd, controller.login);
router.post('/login', controller.processLogin);

router.get('/userRegister', authMd, controller.profile);
router.get('/logout/', controller.logout);

module.exports= router;