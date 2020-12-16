const PostRouter = require('express').Router();
const postController = require('../controllers/postController');

PostRouter.get('/', postController.index);

PostRouter.post(
  '/',
  // postController.validations,
  postController.create,
);

PostRouter.get('/:id', postController.show);

PostRouter.put('/:id',
// postController.validations,
  postController.update);

PostRouter.delete('/:id', postController.destroy);

module.exports = PostRouter;
