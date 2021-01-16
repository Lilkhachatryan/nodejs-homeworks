const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const JWT_KEY = process.env.JWT_KEY || 'dev-jwt';

const validateEmail = function(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UsersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: [true, 'User with the same email already exists.'],
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UsersSchema.pre('save', function () {
    this.password = bcrypt.hashSync(password, process.env.SALT_ROUNDS || 10);
});

UsersSchema.methods.compareHashPassword = function (password) {
    const isMatch = bcrypt.compareSync(password, this.password);
    if (!isMatch) {
        console.log('Password doesn\'t match')
    }
    return isMatch
};

UsersSchema.methods.generateAuthToken = function ({ email, id }) {
    return jwt.sign({
        email,
        id
    }, JWT_KEY, { expiresIn: 36000 });
};

// TODO if not needed remove this before push

UsersSchema.virtual('fullName').get(function() {
    return this.firstName + ' ' + this.lastName
});

UsersSchema.virtual('fullName').set(function(name) {
    let str = name.split(' ');

    this.firstName = str[0];
    this.lastName = str[1]
});

UsersSchema.methods.getInitials = function() {
    return this.firstName[0] + this.lastName[0]
};

UsersSchema.statics.getUsers = function() {
    return new Promise((resolve, reject) => {
        this.find((err, docs) => {
            if(err) {
                console.error(err);
                return reject(err)
            }

            resolve(docs)
        })
    })
};

module.exports = mongoose.model('User', UsersSchema);
