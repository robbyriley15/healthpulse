var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    name: String,
    data: Object
});

module.exports = mongoose.model('User', UserSchema);