const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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

  return res.status(200).json({
    message: 'Posts fetched successfully',
    data: posts
  });
});

app.post('/api/posts', (req, res, next) => {
  const post = req.body;
  console.log(post);
  posts.push(post);
  res.status(201).json({
    message: 'Posts added successfully'
  })
});

module.exports = app;
