const {validationResult} = require('express-validator');

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
        } else {
            res.send('perfecto')
        }
    }
};

module.exports = controller;