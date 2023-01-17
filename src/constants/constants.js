const STATUS = {
  ERROR: {
    GENERIC: {
      statusCode: 400,
      type: "",
      message: "",
    },

    SOMETHING_WENT_WRONG: {
      statusCode: 500,
      type: "SOMETHING_WENT_WRONG",
      message: "Something Went Wrong",
    },
  },

  SUCCESS: {
    CUSTOM_MESSAGE: {
      statusCode: 200,
      type: "SUCCESS",
      data: "",
    },
  },
};

const MESSAGE = {
  SERVER_MSG: "server running at http://localhost:",
  MONGOOSE_CONNECTED: "mongodb connected",
  MONGOOSE_DISCONNECTED: "Mongoose connection is disconnected.",
  REDIS_CONNECTED: "Redis client connected",
  REDIS_NOT_CONNECTED: "Redis is not connected",
  REDIS_READY: "Redis ready to use",
  REDIS_DISCONNECTED: "Redis client disconnected",
  MYSQL_CONNECTED: "MySql Connected",
  MYSQL_NOT_CONNECTED: "MySql not Connected",
  CASSANDRA_CONNECTED: "Cassandra Connected",
  POSTGRES_CONNECTED: "Postgres Connected",
  IS_DICONNECTED: "disconnected",
  IS_ERROR: "error",
  SIGINT: "SIGINT",
  IS_CONNECT: "connect",
  IS_READY: "Ready",
  IS_END: "end",
  AUTHORIZATION: "authorization",
  SESSION_EXPIRED: "Session Expired",
  ACCESS_TOKEN_EXPIRE: "1h",
  REFRESH_TOKEN_EXPIRE: "2h",
  USER_EXISTS: "user exists",
  USER_CREATED: "user created",
  LOGGED_IN_SUCCESS: "Logged in Successfully",
};

module.exports = {
  STATUS,
  MESSAGE,
};
