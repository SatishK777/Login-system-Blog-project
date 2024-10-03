const Blog = require('../models/blogModel');
const upload = require('../config/multer');
const path = require('path')
const fs = require('fs')

exports.getaddBlog = (req, res) => {
  res.render('add-blog');
};

// Add Blog
exports.postaddBlog = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      req.flash('error_msg', err);
      return res.redirect('/blogs');
    } else {
      const { title, content } = req.body;
      const newBlog = new Blog({
        title,
        content,
        image: req.file ? `/uploads/${req.file.filename}` : null, // Save image path
        author: req.user._id,
      });
      await newBlog.save();
      // req.flash('success_msg', 'Blog added successfully');
      res.redirect('/my-blogs');
    }
  });
};

// Get All Blogs
exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find().populate('author', 'fname');
  res.render('blogs', { blogs });
};

// Get My Blogs
exports.getMyBlogs = async (req, res) => {
  const blogs = await Blog.find({ author: req.user._id });
  res.render('my-blogs', { blogs });
};

exports.getEditBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog || blog.author.toString() !== req.user._id.toString()) {
      req.flash('error_msg', 'Not authorized');
      return res.redirect('/my-blogs');
    }

    // Render the edit form and pass the current blog data
    res.render('edit-blog', { blog });
  } catch (err) {
    req.flash('error_msg', 'Error fetching blog details');
    res.redirect('/my-blogs');
  }
};

// Edit Blog
exports.editBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog || blog.author.toString() !== req.user._id.toString()) {
      req.flash('error_msg', 'Not authorized');
      return res.redirect('/my-blogs');
    }

    // Update title and content fields
    blog.title = req.body.title;
    blog.content = req.body.content;

    // Check if a new image was uploaded
    if (req.file) {
      // Delete old image if it exists
      if (blog.image) {
        const oldImagePath = path.join(__dirname, '../public', blog.image); // Update old image path
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Delete old image
        }
      }

      // Assign the new image filename to the blog (with `/uploads/` path)
      blog.image = `/uploads/${req.file.filename}`;
    }

    // Save the updated blog post
    await blog.save();

    req.flash('success_msg', 'Blog updated successfully');
    res.redirect('/my-blogs');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error updating blog');
    res.redirect('/my-blogs');
  }
};


// Delete Blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    // Check if the blog exists and if the user is authorized
    if (!blog || blog.author.toString() !== req.user._id.toString()) {
      req.flash('error_msg', 'Not authorized');
      return res.redirect('/my-blogs');
    }

    // Use findByIdAndDelete instead of remove
    await Blog.findByIdAndDelete(req.params.id);

    req.flash('success_msg', 'Blog deleted successfully');
    res.redirect('/my-blogs');
  } catch (err) {
    req.flash('error_msg', 'An error occurred while trying to delete the blog');
    res.redirect('/my-blogs');
  }
};

exports.logout = (req, res) => {
  req.logout(function(err) {
    if (err) { 
      return next(err); 
    }
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
  });
};

