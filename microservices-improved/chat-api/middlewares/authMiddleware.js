const privateRoutes = [ '/api/v1/users/me'];
const { authenticateJWT } = require('../services/authService');

const checkPublicOrPrivate = (ctx, next) => {
    if (!privateRoutes.includes(ctx.request.path)) {
        return next()
    }

    authenticateJWT(ctx, next);
};


module.exports = {
    checkPublicOrPrivate
};
