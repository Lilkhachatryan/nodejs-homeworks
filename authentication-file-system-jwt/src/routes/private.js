const router = require('express').Router();

router.get('', (req, res) => {
    res.json('private route');
});

module.exports = router;
