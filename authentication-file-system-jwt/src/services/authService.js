const bcrypt = require('bcrypt');
const salt = bcrypt.genSalt(process.env.SALT_ROUNDS || 10);
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY || 'dev-jwt';

const generateHashPassword = (password) => {
    return bcrypt.hashSync(password, salt);
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

const authenticateJWT = (req, res, next) => {
    console.log('jwt');
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, JWT_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = {
    generateHashPassword,
    compareHashPassword,
    generateJWToken,
    authenticateJWT
};
