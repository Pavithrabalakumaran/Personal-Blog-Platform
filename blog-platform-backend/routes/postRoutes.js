const express = require('express');
const { createPost, getPosts } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/post', authMiddleware, createPost);
router.get('/posts', getPosts);

module.exports = router;
