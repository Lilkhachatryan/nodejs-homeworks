const Router = require('koa-router');
const { register, login } = require('../controllers/auth');

const authRouter = new Router({ prefix: '/auth' });

authRouter.post('/login', login);
authRouter.post('/register', register);

module.exports = authRouter;
