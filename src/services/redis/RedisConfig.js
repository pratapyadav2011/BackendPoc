const redis = require("redis");
const { MESSAGE } = require("../../constants/constants");

const redisClient = redis.createClient(
  process.env.REDIS_PORT,
  process.env.REDIS_SERVER_IP
);

redisClient.on(MESSAGE.SIGINT, () => {
  redisClient.quit();
});

redisClient
  .connect()
  .then(() => {
    console.log(MESSAGE.REDIS_CONNECTED);
  })
  .catch((err) => console.log(MESSAGE.REDIS_NOT_CONNECTED));

module.exports = {
  redisClient,
};
