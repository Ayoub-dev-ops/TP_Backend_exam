const jwt = require('jsonwebtoken');
const debug = require('debug')('backend:services:auth');

exports.generateAccessToken = (user) => {
    debug('generating access token : ', user.email);
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
  }

exports.generateRefreshToken = (user) => {
    debug('generating refresh token : ', user.email);
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y' });
  }