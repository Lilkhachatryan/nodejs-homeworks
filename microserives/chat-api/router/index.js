const Router = require('koa-router');
const { checkPublicOrPrivate } = require('../middlewares/authMiddleware');

const authRouter = require('./auth');
const usersRouter = require('./users');

const router = new Router({ prefix: '/api/v1' });

const nestedRoutes = [authRouter, usersRouter];
for (let route of nestedRoutes) {
    router.use(checkPublicOrPrivate)
        .use(route.routes(), route.allowedMethods())
}

module.exports = router;
