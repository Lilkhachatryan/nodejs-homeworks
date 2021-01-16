const validator = require('validator');
const errorHandler = require('../utils/errorHandler');
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

        if (password.length < 8) {
            ctx.status = 400;
            ctx.body = {
                message: 'Password should be greater than 8 characters.'
            };
            return
        }

        let user = new UsersModel({
            firstName,
            lastName,
            email,
            password: generateHashPassword(password)
        });
        await user.save();

        ctx.status = 201;
        ctx.body = {
            success: true,
            token: generateJWToken(user),
            user
        };
    } catch (e) {
        return errorHandler(ctx, e);
    }
};

const login = async (ctx) => {
    try {
        const { email, password } = ctx.request.body;

        if (!(email && password)) {
            errorHandler(ctx, {
                message: "Please fill required fields.",
                status: 400
            });
            return ;
        }

        let user = await UsersModel.findOne({ email });

        if (user) {
            if (!compareHashPassword(password, user.password)) {
                errorHandler(ctx, {
                    message: 'Given password is invalid.',
                    status: 401
                });
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
            errorHandler(ctx, {
                message: 'User with given email doesn\'t exists.',
                status: 400
            });
        }
    } catch (e) {
        return errorHandler(ctx, e);
    }
};

module.exports = {
    register,
    login
};
