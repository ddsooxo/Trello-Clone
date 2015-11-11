//-------------------Board schema----------------------------------//
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// created schema for Board
var boardSchema = new Schema({
  title: {type: String, required: true},
  created_at: Date,
  updated_at: Date,
  _lists: [{type: mongoose.Schema.Types.ObjectId, ref:'List'}]
});

var Board = mongoose.model('Board', boardSchema);

module.exports = Board;