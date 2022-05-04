var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CategorySchema = new Schema(
    {
        name:{type: String, required:true, max:100, min:3}
    }
);
CategorySchema.virtual('url').get(function(){
    return '/invetory/category/' + this._id;
});
module.exports = mongoose.model('Category', CategorySchema);