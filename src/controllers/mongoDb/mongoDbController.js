const Models = require("../../models");
const { STATUS } = require("../../constants/constants");
const { dbService } = require("../../services");

// Get user list from MongoDB collection
const MongoExample = async () => {
  try {
    const userData = await dbService.getData(Models.User, {});
    STATUS.SUCCESS.CUSTOM_MESSAGE.data = userData;
    return STATUS.SUCCESS.CUSTOM_MESSAGE;
  } catch (error) {
    if (error.statusCode && error.message) return error;
    else {
      return STATUS.ERROR.SOMETHING_WENT_WRONG;
    }
  }
};

module.exports = {
  MongoExample,
};
