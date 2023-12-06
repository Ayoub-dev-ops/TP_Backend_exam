var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    salt: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "user"}
});

module.exports = mongoose.model('ayoub-users', UserSchema);