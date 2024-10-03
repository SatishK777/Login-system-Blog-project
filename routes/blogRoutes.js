const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
// const { ensureAuthenticated } = require('../config/db');
const upload = require('../config/multer')


// View all blogs
router.get('/blogs', ensureAuthenticated, blogController.getBlogs);

// View my blogs
router.get('/my-blogs', ensureAuthenticated, blogController.getMyBlogs);

router.get('/blogs/add', ensureAuthenticated, blogController.getaddBlog);

// Add a blog
router.post('/blogs/add', ensureAuthenticated, blogController.postaddBlog);

router.get('/blogs/edit/:id', ensureAuthenticated, blogController.getEditBlog);

// Edit a blog
router.post('/blogs/edit/:id', ensureAuthenticated,upload, blogController.editBlog);

// Delete a blog
router.post('/blogs/delete/:id', ensureAuthenticated, blogController.deleteBlog);

//Log Out
router.get('/logout', ensureAuthenticated, blogController.logout);

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}   

module.exports = router;
