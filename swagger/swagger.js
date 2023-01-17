const swaggerAutogen = require("swagger-autogen")();
const path = require("path");

const doc = {
  info: {
    version: "1.0.0",
    title: "Starter Kit",
    description: "Starter Kit",
  },
  host: "localhost:5005",
  basePath: "/api/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      name: "authorization",
      in: "header",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
  definitions: {},
};

const outputFile = "./swagger/swagger_output.json";
const endpointsFiles = [
  path.join(__dirname, "../src/routes/HomeRoute.js"),
  path.join(__dirname, "../src/routes/auth/authRoute.js"),
]; // Mention the file name which you want to document in swagger

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("../app"); // The project's root file
});
