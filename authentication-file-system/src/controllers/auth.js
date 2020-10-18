const validator = require('validator');
const shortid = require('shortid');
const errorHandler = require('../utils/errorHandler');
const fs = require('fs').promises;
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        const { fName, lName, email, password } = req.body;

        if (!(fName && lName && email && password)) {
            return res.status(400).json({
                message: 'Please fill required fields.'
            })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: 'Email is not valid.'
            })
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: 'Password should be greater than 8 characters.'
            })
        }

        let users = await fs.readFile('./users.json', 'utf8');
        users = users ? JSON.parse(users) : {};

        if (!users[email]) {
            let user = {
                id: shortid.generate(),
                fName,
                lName,
                email,
                password: await bcrypt.hash(password, process.env.SALTROUNDS || 10)
            };
            users[email] = user;

            await fs.writeFile('./users.json', JSON.stringify(users));

            return res.status(201).json({
                user: user
            });
        } else {
            return res.status(400).json({
                message: 'User with the same email already exists.'
            })
        }
    } catch (e) {
        return errorHandler(res, e);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            return res.status(400).json({
                message: 'Please fill required fields.'
            })
        }

        let users = await fs.readFile('./users.json', 'utf8');
        users = users ? JSON.parse(users) : {};
        const user = users[email];

        if (user) {
            if (!bcrypt.compareSync(password, user.password)) {
                return res.status(400).json({
                    message: 'Given password is invalid.'
                })
            }

            return res.status(200).json({
                success: true
            });
        } else {
            return res.status(400).json({
                message: 'User with given email doesn\'t exists.'
            })
        }
    } catch (e) {
        return errorHandler(res, e);
    }
};

module.exports = {
    register,
    login
};
