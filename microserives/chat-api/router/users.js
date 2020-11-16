const Router = require('koa-router');
const { getUser } = require('../controllers/users');

const usersRouter = new Router({ prefix: '/users' });

usersRouter.get('/me', getUser);

module.exports = usersRouter;
