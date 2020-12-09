const commentRouter = require('express').Router();
const commentController = require('../controllers/commentController');

commentRouter.get('/', commentController.index);

commentRouter.get('/:id', commentController.show);

commentRouter.post('/comments', commentController.validations, commentController.create);

commentRouter.put('/:id', commentController.validations, commentController.update);

commentRouter.delete('/:id', commentController.destroy);

module.exports = commentRouter;
