const express = require('express');
const authRoute = require('./auth');
const privateRoute = require('./private');
const router = express.Router();
const { checkPublicOrPrivate } = require('../middlewares/authMiddleware');


router.use('/auth', authRoute);

router.use(checkPublicOrPrivate);

router.use('/private', privateRoute);

router.use((req, res, next) => {
    res.status(404).send("Sorry can't find that route!")
});

module.exports = router;



