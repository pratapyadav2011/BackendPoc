const { STATUS } = require("../constants/constants");

/**
 * @description This is a test function
 * @author Shubham
 * @param {*} none no param required
 * @returns {object} string message
 */

const Home = async () => {
  try {
    const homeText = "this is the home route";
    STATUS.SUCCESS.CUSTOM_MESSAGE.data = homeText;
    return STATUS.SUCCESS.CUSTOM_MESSAGE;
  } catch (error) {
    console.log(error);
    if (error.statusCode && error.message) return error;
    else {
      return STATUS.ERROR.SOMETHING_WENT_WRONG;
    }
  }
};

module.exports = {
  Home,
};
