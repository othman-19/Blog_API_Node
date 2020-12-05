const commentRouter = require('express').Router();
const commentController = require('../controllers/commentController');
const commenterController = require('../controllers/commenterController');

commentRouter.get('/new', commentController.new);

commentRouter.post('/', commenterController.validations, commentController.validations, commenterController.create, commentController.create);

commentRouter.get('/:id/edit', commentController.edit);

commentRouter.put('/:id', commenterController.validations, commentController.validations, commenterController.create, commentController.update);

commentRouter.delete('/:id', commentController.destroy);

module.exports = commentRouter;
