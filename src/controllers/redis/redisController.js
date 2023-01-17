const { STATUS } = require("../../constants/constants");
const { Get, Set } = require("../../services/redis/RedisService");
const { bcryptEncryption } = require("../../util/bcrypt");

// DEMO FOR POSTGRES SQL
const RedisExample = async () => {
  try {
    // To encrypt/decrypt sensitive data
    const password = "testPassword";
    const hashedPass = await bcryptEncryption(password);

    // check if data already present in redis
    const isPresent = await Get(password);
    if (isPresent) console.log("hashedPassword-> ", isPresent);

    // how to store data in redis cache store
    const response = await Set(password, hashedPass);

    STATUS.SUCCESS.CUSTOM_MESSAGE.data = response;
    return STATUS.SUCCESS.CUSTOM_MESSAGE;
  } catch (error) {
    if (error.statusCode && error.message) return error;
    else {
      return STATUS.ERROR.SOMETHING_WENT_WRONG;
    }
  }
};
module.exports = {
  RedisExample,
};
