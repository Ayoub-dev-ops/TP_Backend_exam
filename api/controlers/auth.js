'use strict';

const jwt = require('jsonwebtoken');
const Services = require('../../services/auth');
const UserServices = require('../../services/users');

exports.login = async (req, res, next) => {

  var user = await UserServices.getUser(req.body?.email);
  if (user == undefined) {
      return res.status(401).send('crédits invalides');
  }

  if (!UserServices.authenticate(req.body.password,user) ) {
      return res.status(401).send('crédits invalides');
  }
  const accessToken = Services.generateAccessToken(user.front);
  const refreshToken = Services.generateRefreshToken(user.front);
  return res.status(200).json({
    accessToken,
    refreshToken
  });

}

exports.refreshToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, userFromToken) => {
      if (err) {
        return res.sendStatus(401)
      }

      var user = await UserServices.getUser(userFromToken.email);
      if (user == undefined) {
        return res.status(401).send('crédits invalides');
      }
      
      const refreshedToken = Services.generateAccessToken(user.front);
      res.send({
        accessToken: refreshedToken,
      });
    });
}