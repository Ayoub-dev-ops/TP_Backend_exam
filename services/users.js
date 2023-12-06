const User = require('../models/users');
var crypto = require('crypto');
var debug = require('debug')('backend:services:users');


  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  function makeSalt() {
    return crypto.randomBytes(16).toString('base64');
  };

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  
  function encryptPassword(password,salt) {
    debug('mot de passe encrypté: ', password,' salt: ', salt);
    if (!password || !salt) return undefined;
    
    var salt = Buffer.from(salt, 'base64');
    return crypto
      .pbkdf2Sync(password, salt, 10000, 64, 'sha256')
      .toString('base64');
  };

  exports.authenticate = (plainText, user) =>{
    debug('vérification du MDP : ', plainText,' user: ', user);
    if (!plainText ||!user) return false;
    debug('encrypted : ', encryptPassword(plainText, user.salt),' user.password : ', user.password);
    return encryptPassword(plainText, user.salt) === user.password;
  },

exports.createUser =  async (user) => { 

    if (!user.name ||!user.email ||!user.password) {
        return Promise.reject(new Error('Champs requis manquant'))
    }
    try {
        var existingUser  = await User.findOne({"email": user.email});
        if (existingUser) {
            debug('Utilisateur déjà existant: ',existingUser?.name);
            throw new Error('Utilisateur déjà existant')
        }
    } catch (error) {
        throw error;
    }

    var plainPassword = user.password;
    user.salt = makeSalt();
    var hashedPassword = encryptPassword(plainPassword,user.salt);
    if (!hashedPassword) {
        throw new Error('MDP non encodable');
    }
    user.password = hashedPassword;
    const newUser = new User(user);
    return newUser.save();
}

exports.getUser = async (email) => { 
    if (!email) {
        debug('Champs requis manquant : ', email);
        return undefined;
    }
    try {
    return User.findOne({"email": email});
    } catch (error) {
        debug('erreur lors de la recherche du user', error);
        return undefined;
    }
};