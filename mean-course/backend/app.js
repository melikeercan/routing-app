const Post = require('./models/post');
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://melikeercan:ukhbKVsRvMtbAqJK@cluster0.antmk.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => console.log('connected')).catch(() => console.log('error'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

const posts = [
  { id: "vmfsvmkmv", title: 'Title 1', content: 'Content 1'},
  { id: "ewvckewnc", title: 'Title 2', content: 'Content 2'},
  { id: "fnvfjbffn", title: 'Title 3', content: 'Content 3'},
];

app.get('/api/posts', (req, res, next) => {
  Post.find().then((documents) => {
    console.log(documents);
    return res.status(200).json({
      message: 'Posts fetched successfully',
      data: documents
    });
  });

});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({title: req.body.title, content: req.body.content});
  post.save().then(result => {
    console.log('saved');
    res.status(201).json({
      message: 'Posts added successfully',
      postId: result._id
    });
  });

});

app.delete('/api/posts/:id', (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({_id: req.params.id}).then((result) => {
    console.log(result);
    res.status(200).json({
      message: 'Posts deleted successfully'
    });
  });
});

module.exports = app;
