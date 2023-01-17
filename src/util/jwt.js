const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { MESSAGE } = require("../constants/constants");

const signAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: MESSAGE.ACCESS_TOKEN_EXPIRE,
      audience: userId,
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err);
        reject(createError.InternalServerError());
        return;
      }
      resolve(token);
    });
  });
};

const signRefreshToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: MESSAGE.REFRESH_TOKEN_EXPIRE,
      audience: userId,
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        reject(createError.InternalServerError());
      }
      resolve(token);
    });
  });
};

module.exports = {
  signAccessToken,
  signRefreshToken,
};
