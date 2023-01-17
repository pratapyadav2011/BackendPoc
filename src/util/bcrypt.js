const bcrypt = require('bcryptjs');

/**
 * @description Encrypt data
 * @author Shubham
 * @param string plain text string
 * @returns hashed string
 */
const bcryptEncryption = async (plaintText) => {
  try {
    const saltValue = await bcrypt.genSalt(
      Number(process.env.BCRYPT_SALTROUND)
    );
    return bcrypt.hash(plaintText, saltValue);
  } catch (error) {
    return error;
  }
};

/**
 * @description This is a password validate function
 * @author Shubham
 * @param {*} string plain text & hashed text
 * @returns {boolean} true/false
 */
const validatePassword = async (plaintTextPassword, hashedPassword) => {
  try {
    return bcrypt.compare(plaintTextPassword, hashedPassword);
  } catch (error) {
    return error;
  }
};

module.exports = {
  bcryptEncryption,
  validatePassword,
};
