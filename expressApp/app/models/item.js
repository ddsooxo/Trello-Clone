//-------------------Item schema----------------------------------//
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// created schema for Item
var itemSchema = new Schema({
  item_title: {type: String, required: true},
  created_at: Date,
  updated_at: Date,
  _list: {type: Schema.Types.ObjectId, ref:'List'}
});


var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
