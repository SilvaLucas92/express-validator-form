const userLoggedMd = (req, res, next) => {
    res.locals.isLogged = false;
    next();
};

module.exports = userLoggedMd