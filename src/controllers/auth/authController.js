const Models = require("../../models");
const { signAccessToken, signRefreshToken } = require("../../util/jwt");
const { STATUS, MESSAGE } = require("../../constants/constants");
const {
  ErrorMessage,
  NOT_FOUND_ERROR,
  UNAUTHORIZED_ERROR,
} = require("../../constants/error");
const { bcryptEncryption, validatePassword } = require("../../util/bcrypt");
const { dbService } = require("../../services");

// create new user
const SignUp = async (req) => {
  const { firstName, userName, password } = req;
  try {
    const hashedPass = await bcryptEncryption(password);
    const newUser = await dbService.createData(Models.User, {
      firstName,
      userName,
      password: hashedPass,
    });
    STATUS.SUCCESS.CUSTOM_MESSAGE.data = newUser;
    return STATUS.SUCCESS.CUSTOM_MESSAGE;
  } catch (error) {
    if (error.statusCode && error.message) return error;
    else {
      return STATUS.ERROR.SOMETHING_WENT_WRONG;
    }
  }
};

// login function
const SignIn = async (req) => {
  const { userName, password } = req;
  try {
    const user = await dbService.getFindOneData(Models.User, {
      userName: userName,
    });
    if (!user) return NOT_FOUND_ERROR(ErrorMessage.INVALID_CREDENTIALS);

    const isPassMatch = await validatePassword(password, user.password);
    if (!isPassMatch)
      return UNAUTHORIZED_ERROR(ErrorMessage.INVALID_CREDENTIALS);
    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);
    await dbService.updateData(
      Models.User,
      { _id: user._id },
      { accessToken: accessToken, refreshToken: refreshToken }
    );

    const data = {
      message: MESSAGE.LOGGED_IN_SUCCESS,
      user: {
        _id: user._id,
        firstName: user.firstName,
        userName: user.userName,
        contact: user.contact,
        bioDetail: user.bioDetail,
      },
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    STATUS.SUCCESS.CUSTOM_MESSAGE.data = data;
    return STATUS.SUCCESS.CUSTOM_MESSAGE;
  } catch (error) {
    if (error.statusCode && error.message) return error;
    else {
      return STATUS.ERROR.SOMETHING_WENT_WRONG;
    }
  }
};

// logout function
const SignOut = async (req) => {
  try {
    await dbService.updateData(
      Models.User,
      { _id: req.payload.aud },
      { $unset: { accessToken: "" } }
    );
    STATUS.SUCCESS.CUSTOM_MESSAGE.data = {
      message: "Logout Successfully",
    };
    return STATUS.SUCCESS.CUSTOM_MESSAGE;
  } catch (error) {
    if (error.statusCode && error.message) return error;
    else {
      return STATUS.ERROR.SOMETHING_WENT_WRONG;
    }
  }
};

// get new access token
const GetToken = async (req) => {
  try {
    const accessToken = await signAccessToken(req.payload.aud);
    const refreshToken = await signRefreshToken(req.payload.aud);
    await dbService.updateData(
      Models.User,
      { _id: req.payload.aud },
      { accessToken: accessToken, refreshToken: refreshToken }
    );
    STATUS.SUCCESS.CUSTOM_MESSAGE.data = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    return STATUS.SUCCESS.CUSTOM_MESSAGE;
  } catch (error) {
    if (error.statusCode && error.message) return error;
    else {
      return STATUS.ERROR.SOMETHING_WENT_WRONG;
    }
  }
};

module.exports = {
  SignUp,
  SignIn,
  SignOut,
  GetToken,
};
