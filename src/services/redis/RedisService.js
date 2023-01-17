// uncomment this line to use redis
// const { redisClient } = require("./RedisConfig");

const Get = async (key) => {
  const response = await redisClient.get(key);
  return JSON.parse(response);
};

const Set = async (key, data) => {
  const response = await redisClient.set(key, JSON.stringify(data));
  return response;
};

// ttl - time to live in seconds
const SetEx = async (key, ttl, data) => {
  const response = await redisClient.setEx(key, ttl, JSON.stringify(data));
  return JSON.parse(response);
};

const Del = async (key) => {
  const response = await redisClient.del(key);
  return response;
};

module.exports = {
  Get,
  Set,
  SetEx,
  Del,
};
