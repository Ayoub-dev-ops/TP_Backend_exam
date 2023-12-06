const users = require("../../models/users");
const userService = require("../../services/users");
const debug = require('debug')('backend:api:users');


exports.getMe = (req, res, next) => {
  var id = req.user._id;
  users.findOne({ "_id": id }).then(data => {
    if (data == null) { return res.status(404).json({ message: 'no user with that id' }); }
    return res.status(200).json(data.front);
  }).catch(err => {
    if (err) return next(err);
  });
};

exports.create = async (req, res, next) => {
  var user = req.body;
  try {
    var createdUser = await userService.createUser(user);
    return res.status(201).json(createdUser.front);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};