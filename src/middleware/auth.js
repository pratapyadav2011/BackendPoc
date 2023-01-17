const jwt = require("jsonwebtoken");
const { dbService } = require("../services");
const Models = require("../models");
const { MESSAGE } = require("../constants/constants");
const { ErrorMessage, UNAUTHORIZED_ERROR } = require("../constants/error");

const matchAccessToken = async (userId, token) => {
  const userData = await dbService.getData(Models.User, {
    _id: userId,
    accessToken: token,
  });
  return userData.length > 0 ? true : false;
};

const verifyAccessToken = (req, res, next) => {
  if (!req.headers[MESSAGE.AUTHORIZATION])
    return next(UNAUTHORIZED_ERROR(ErrorMessage.UNAUTHORIZED_ERROR));
  const authHeader = req.headers[MESSAGE.AUTHORIZATION];
  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
      if (err) {
        console.log(err);
        const message =
          err.name === ErrorMessage.JSON_TOKEN_ERROR
            ? ErrorMessage.UNAUTHORIZED_ERROR
            : err.message;
        return next(UNAUTHORIZED_ERROR(message));
      } else {
        const isMatch = await matchAccessToken(payload.aud, token);
        if (isMatch) {
          req.payload = payload;
          next();
        } else {
          return next(UNAUTHORIZED_ERROR(ErrorMessage.UNAUTHORIZED_ERROR));
        }
      }
    });
  } catch (error) {
    res.status(400).send({ success: false, error: MESSAGE.SESSION_EXPIRED });
  }
};

const matchRefreshToken = async (userId, token) => {
  const userData = await dbService.getData(Models.User, {
    _id: userId,
    refreshToken: token,
  });
  return userData.length > 0 ? true : false;
};

const verifyRefreshToken = (req, res, next) => {
  if (!req.headers[MESSAGE.AUTHORIZATION])
    return next(UNAUTHORIZED_ERROR(ErrorMessage.UNAUTHORIZED_ERROR));
  const authHeader = req.headers[MESSAGE.AUTHORIZATION];
  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, payload) => {
        if (err) {
          console.log(err);
          const message =
            err.name === ErrorMessage.JSON_TOKEN_ERROR
              ? ErrorMessage.UNAUTHORIZED_ERROR
              : err.message;
          return next(UNAUTHORIZED_ERROR(message));
        } else {
          const isMatch = await matchRefreshToken(payload.aud, token);
          if (isMatch) {
            req.payload = payload;
            next();
          } else {
            return next(UNAUTHORIZED_ERROR(ErrorMessage.UNAUTHORIZED_ERROR));
          }
        }
      }
    );
  } catch (error) {
    res.status(400).send({ success: false, error: MESSAGE.SESSION_EXPIRED });
  }
};

module.exports = {
  verifyRefreshToken,
  verifyAccessToken,
};
