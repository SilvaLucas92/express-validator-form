const guestMd = (req, res, next) => {
    if(req.session.userLogged) {
        return res.redirect ('userRegister');
    }
    next();

};

module.exports = guestMd;