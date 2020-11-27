const { createPost, getPost, deletePost, updatePost, getAllPosts } = require('../handlers/posts');
const router = require('express').Router();

router.get('/', getAllPosts)

router.get('/:id', getPost);

router.post('/', createPost);

router.delete('/:id', deletePost);

router.put('/:id', updatePost);

module.exports = router;