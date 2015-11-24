//-------------------List schema----------------------------------//
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// created schema for List
var listSchema = new Schema({
  list_title: {type: String, required: true},
  created_at: Date,
  updated_at: Date,
  // _user: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
  // _items: [{type: mongoose.Schema.Types.ObjectId, ref:'Item'}],
  _board: [{type: mongoose.Schema.Types.ObjectId, ref: 'Board'}]
});

var List = mongoose.model('List', listSchema);

module.exports = List;