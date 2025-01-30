const router = require('express').Router();

const taskController = require('../controllers/taskController.js');

router
    .route('/Task')
    .post((req, res) => taskController.create(req, res));

router
    .route('/Task')
    .get((req, res) => taskController.getAll(req, res));

router
    .route('/Task/:id')
    .get((req, res) => taskController.get(req, res));

router
    .route('/Task/:id')
    .delete((req, res) => taskController.delete(req, res));

router
    .route('/Task/:id')
    .put((req, res) => taskController.update(req, res));

module.exports = router;