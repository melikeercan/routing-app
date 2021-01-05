const express = require('express');
const multer = require('multer');
const Post = require('../models/post');
const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = null;
    if(!isValid) {
      error = new Error('Invalid mime type');
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extension = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + extension);
  }
})

router.get('', (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  let postQuery = Post.find();
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  let fetchedPosts;
  postQuery
    .then((documents) => {
      console.log('fetched');
      console.log(documents);
      fetchedPosts = documents;
      return Post.count();
    }).then(count => {
      return res.status(200).json({
        message: 'Posts fetched successfully',
        posts: fetchedPosts,
        count: count
      });
    });

});

router.get('/:id', (req, res, next) => {
  console.log(req.params.id);
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json({
        message: 'Post found',
        post: post
      });
    } else {
      res.status(404).json({
        message: 'Post not found'
      });
    }
  });
});

router.post('', multer({storage: storage}).single('image'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename,
  });
  post.save().then(result => {
    console.log('saved');
    console.log(result);
    res.status(201).json({
      message: 'Post added successfully',
      post: {
        id: result._id,
        title: result.title,
        content: result.content,
        imagePath: result.imagePath
      }
    });
  });

});

router.put('/:id', multer({storage: storage}).single('image'), (req, res, next) => {
  let imagePath = req.body.imagePath;
  if(req.file) {
    console.log('file:');
    console.log(req.file.filename);
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + '/images/' + req.file.filename;
  }
  const post = new Post({_id: req.params.id, title: req.body.title, content: req.body.content, imagePath: imagePath});
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log('updated');
    console.log(result);
    res.status(201).json({
      message: 'Post updated successfully',
      post: {
        id: result._id,
        title: result.title,
        content: result.content,
        imagePath: imagePath
      }
    });
  });


});

router.delete('/:id', (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({_id: req.params.id}).then((result) => {
    console.log('deleted');
    console.log(result);
    res.status(200).json({
      message: 'Post deleted successfully'
    });
  });
});

module.exports = router;
