const dotenv = require('dotenv');
dotenv.config();

const Koa = require('koa');
const KoaJson= require('koa-json');
const CORS = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const router = require('./router');
const mongoose = require('mongoose');

const app = new Koa();

app.use(KoaJson());
app.use(CORS());
app.use(bodyParser());

// router middleware
app.use(router.routes()).use(router.allowedMethods());

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useFindAndModify: false }).then(() => {
    console.log("MongoDb");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, (() => console.log(`Server started on port ${PORT}`)));
}).catch((err) => {
    console.log(err)
});

