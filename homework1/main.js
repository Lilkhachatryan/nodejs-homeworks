const dotenv = require('./dotenv');

dotenv.config('.env');
console.log('db host -> ', process.env.DB_HOST);
