const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const PostModelSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Post', PostModelSchema );
