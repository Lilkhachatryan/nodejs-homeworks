const validator = require('validator');
const shortid = require('shortid');
const errorHandler = require('../utils/errorHandler');
const fs = require('fs').promises;
const { UsersModel } = require('chat-mongo-db');

const {
    generateJWToken,
    compareHashPassword,
    generateHashPassword
}  = require('../services/authService');

const register = async (ctx) => {
    try {
        const { firstName, lastName, email, password } = ctx.request.body;

        if (!(firstName && lastName && email && password)) {
            ctx.status = 400;
            ctx.body = {
                message: 'Please fill required fields.'
            };
            return
        }

        let users = await fs.readFile('./users.json', 'utf8');
        users = users ? JSON.parse(users) : {};

        if (!users[email]) {
            if (!validator.isEmail(email)) {
                ctx.status = 400;
                ctx.body = {
                    message: 'Email is not valid.'
                };
                return
            }

            if (password.length < 8) {
                ctx.status = 400;
                ctx.body = {
                    message: 'Password should be greater than 8 characters.'
                };
                return
            }

            let user = {
                id: shortid.generate(),
                firstName,
                lastName,
                email,
                password: generateHashPassword(password)
            };

            users[email] = user;

            await fs.writeFile('./users.json', JSON.stringify(users));

            ctx.status = 201;
            ctx.body = {
                token: generateJWToken(user),
                // user
            };
        } else {
            ctx.status = 400;
            ctx.body = {
                message: 'User with the same email already exists.'
            };
        }
    } catch (e) {
        return errorHandler(ctx, e);
    }
};

const login = async (ctx) => {
    try {
        const { email, password } = ctx.request.body;
        const test = await UsersModel.find({});
        console.log('test', test);

        if (!(email && password)) {
            ctx.status = 400;
            ctx.body = {
                message: 'Please fill required fields.'
            };
            return
        }

        let users = await fs.readFile('./users.json', 'utf8');
        users = users ? JSON.parse(users) : {};
        const user = users[email];

        if (user) {
            if (!compareHashPassword(password, user.password)) {
                ctx.status = 400;
                ctx.body = {
                    message: 'Given password is invalid.'
                };
                return
            }

            delete user.password;
            ctx.status = 200;
            ctx.body = {
                token: generateJWToken(user),
                success: true,
                user
            };
        } else {
            ctx.status = 400;
            ctx.body = {
                message: 'User with given email doesn\'t exists.'
            };
        }
    } catch (e) {
        return errorHandler(ctx, e);
    }
};

module.exports = {
    register,
    login
};
