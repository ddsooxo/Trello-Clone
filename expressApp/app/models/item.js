//-------------------Item schema----------------------------------//

// grab the things we need
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

// make this available to our users in our Node applications
module.exports = Item;

//function for model 
// itemSchema.methods.addTitle: function(id){
//     raise('Not implemented');
        // List.find({list_id: id}, function (error, list){
        //     if()
        // })  
// }