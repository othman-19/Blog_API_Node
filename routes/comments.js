const commentRouter = require('express').Router();
const commentController = require('../controllers/commentController');

commentRouter.get('/:postId/comments', commentController.index);

commentRouter.get('/:postId/comments/:id', commentController.show);

commentRouter.post(
  '/:postId/comments',
  // commentController.validations,
  commentController.create,
);

commentRouter.put(
  '/:postId/comments/:id',
  // commentController.validations,
  commentController.update,
);

commentRouter.delete('/:postId/comments/:id', commentController.destroy);

module.exports = commentRouter;
