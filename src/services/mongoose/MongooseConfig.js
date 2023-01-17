const mongoose = require("mongoose");
const { MESSAGE } = require("../../constants/constants");

console.log(process.env.MONGO_DB_URI);
mongoose
  .connect(process.env.MONGO_DB_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(MESSAGE.MONGOOSE_CONNECTED);
  })
  .catch((err) => console.log(err.message));

mongoose.connection.on(MESSAGE.IS_ERROR, (err) => {
  console.log(err.message);
});

mongoose.connection.on(MESSAGE.IS_DICONNECTED, () => {
  console.log(MESSAGE.MONGOOSE_DISCONNECTED);
});

process.on(MESSAGE.SIGINT, async () => {
  await mongoose.connection.close();
  process.exit(0);
});
