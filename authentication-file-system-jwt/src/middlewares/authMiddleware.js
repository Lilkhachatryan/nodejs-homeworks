const privateRoutes = [ '/private'];
const { authenticateJWT } = require('../services/authService');

const checkPublicOrPrivate = (req, res, next) => {
    if (!privateRoutes.includes(req.path)) {
        return next()
    }

    authenticateJWT(req, res, next);
};


module.exports = {
    checkPublicOrPrivate
};
