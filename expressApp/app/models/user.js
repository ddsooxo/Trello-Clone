//-------------------User schema----------------------------------//
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// created schema for User
var userSchema = new Schema({
  full_name: {type: String, required: true},
  username: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  bio: {type: String},
  created_at: Date,
  updated_at: Date
  // _boards: [{type: mongoose.Schema.Types.ObjectId, ref:'Board'}]
});

var User = mongoose.model('User', userSchema);

module.exports = User;