const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '../data/posts.json');

// Helper function to read posts
const readPosts = () => JSON.parse(fs.readFileSync(postsPath, 'utf-8'));

// Helper function to save posts
const savePosts = (posts) => fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));

// Create Post
exports.createPost = (req, res) => {
  const { title, content } = req.body;
  const posts = readPosts();

  const newPost = {
    id: Date.now(),
    title,
    content,
    authorId: req.user.id,
    createdAt: new Date().toISOString(),
  };

  posts.push(newPost);
  savePosts(posts);

  res.status(201).json(newPost);
};

// Get Posts
exports.getPosts = (req, res) => {
  const posts = readPosts();
  const { author } = req.query;

  const filteredPosts = author
    ? posts.filter((post) => post.authorId === parseInt(author))
    : posts;

  res.json(filteredPosts);
};
