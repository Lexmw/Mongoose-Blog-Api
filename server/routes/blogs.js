const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

router.get('/', (req, res) => {
    Blog    
        .find()
        .then(blogs =>  res.status(200).json(blogs))
        .catch(err => {
            res.status(404).send('Not able to retrieve the Blogs.')
            console.log(err);

        });
});

router.get('/featured', (req, res) => {
    Blog
        .where("featured", true)
        .then(blogs => res.status(200).json(blogs))
        .catch(err => {
            res.status(404).send('Cannot get featured Blogs.');
            console.log(err);
        });
});

router.get('/:id', (req, res) => {
    Blog.findById(req.params.id)
      .then(blogs => {
        if (!blogs) res.status(404).send();
        res.status(200).json(blogs);
      })
      .catch(err => res.status(404).send('Error: Unable to get user. Please try again!'));
  });
  

router.post('/', (req, res) => {
  let dbUser = null;
  User.findById(req.body.author)
    .then(user => {
      dbUser = user;
      const newBlog = new Blog(req.body);
      newBlog.author = user._id;
      return newBlog.save();
    })
    .then(blog => {
      console.log(dbUser);
      dbUser.blogs.push(blog);
      dbUser.save().then(() => res.status(201).json(blog));
    }).catch((error => console.log(error)))
});

router.put('/:id', (req, res) => {
    Blog
    .findByIdAndUpdate(req.params.id, req.body)
    .then(blog => {
        if(blog){res.status(204).json(blog)
            console.log('blog updated!');
        }
    }).catch(res.status(404).send('Unable to update the blog.'))
});

router.delete('/:id', (req, res) => {
    Blog
        .findByIdAndRemove(req.params.id)
        .then(blog => {
            if(blog) {
                res.status(200).json(blog);
                console.log(`Successfully deleted ${blog}`)
            }
        })
        .catch( res.status(500).send('Cannot delete the blog.') )
})

module.exports = router;