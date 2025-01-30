const router = require('express').Router();

// Task router
const taskRouter = require('./Task.js');

router.use('/', taskRouter);

module.exports = router;