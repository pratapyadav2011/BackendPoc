const { STATUS } = require("../../constants/constants");
const { dbService } = require("../../services");

//  DEMO FOR POSTGRES SQL
const PGExample = async () => {
  try {
    const createTable = `CREATE TABLE IF NOT EXISTS app_user (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      data JSONB
    )`;

    // create our temp table
    await dbService.query(createTable);
    const newUser = {
      username: "brian.m.carlson@gmail.com",
      passwaord: "asdf",
    };

    // create a new user
    await dbService.query("INSERT INTO app_user(data) VALUES($1)", [newUser]);
    const { rows } = await dbService.query("SELECT * FROM app_user");

    STATUS.SUCCESS.CUSTOM_MESSAGE.data = rows;
    return STATUS.SUCCESS.CUSTOM_MESSAGE;
  } catch (error) {
    if (error.statusCode && error.message) return error;
    else {
      return STATUS.ERROR.SOMETHING_WENT_WRONG;
    }
  }
};

module.exports = {
  PGExample,
};
