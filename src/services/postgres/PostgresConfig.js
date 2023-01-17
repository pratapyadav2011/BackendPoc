const { Client } = require("pg");
const { MESSAGE } = require("../../constants/constants");

const PgClient = new Client({
  type: process.env.DB_TYPE,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB_NAME,
});

PgClient.connect()
  .then(() => {
    console.log(MESSAGE.POSTGRES_CONNECTED);
  })
  .catch((err) => console.log(err.message));

process.on(MESSAGE.SIGINT, async () => {
  await PgClient.end();
  process.exit(0);
});

module.exports = PgClient;
