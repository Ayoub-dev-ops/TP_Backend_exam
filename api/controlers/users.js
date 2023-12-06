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

exports.getAll = (req, res, next) => {
  users.find({}).then(data => {
    return res.status(200).json(data);
  }).catch(err => {
    if (err) return next(err);
  });
}

exports.update = async (req, res, next) => {
  var id = req.params.id;
  var user = req.body;
  try {
    var updatedUser = await userService.updateUser(id, user);
    return res.status(200).json(updatedUser.front);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.delete = async (req, res, next) => {
  var id = req.params.id;
  try {
    var deletedUser = await userService.deleteUser(id);
    return res.status(200).json(deletedUser.front);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

exports.login = async (req, res, next) => {
  var user = req.body;
  try {
    var loggedUser = await userService.loginUser(user);
    return res.status(200).json(loggedUser.front);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}