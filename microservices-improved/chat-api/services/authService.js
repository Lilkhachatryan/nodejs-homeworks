const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY || 'dev-jwt';

const generateHashPassword = (password) => {
    return bcrypt.hashSync(password, process.env.SALT_ROUNDS || 10);
};

const compareHashPassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
};

const generateJWToken = ({ email, id } = {}) => {
  return jwt.sign({
      email,
      id
  }, JWT_KEY, { expiresIn: 36000 });
};

const authenticateJWT = (ctx, next) => {
    const authHeader = ctx.request.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, JWT_KEY, (err, user) => {
            if (err) {
                ctx.status = 403;
                return
            }
            ctx.request.user = user;
            next();
        });
    } else {
        ctx.status = 401;
    }
};

module.exports = {
    generateHashPassword,
    compareHashPassword,
    generateJWToken,
    authenticateJWT
};
