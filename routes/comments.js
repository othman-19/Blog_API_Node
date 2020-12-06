const commentRouter = require('express').Router();
const commentController = require('../controllers/commentController');

commentRouter.get('/new', commentController.new);

commentRouter.post('/', commentController.validations, commentController.create);

commentRouter.get('/:id/edit', commentController.edit);

commentRouter.put('/:id', commentController.validations, commentController.update);

commentRouter.delete('/:id', commentController.destroy);

module.exports = commentRouter;
