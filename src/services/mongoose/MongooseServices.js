const Mongoose = require("mongoose");
const mongoose = require("./MongooseConfig");

const getData = function (Model, criteria, projection, options) {
  return Model.find(criteria, projection, options);
};

const getFindOneData = function (Model, query) {
  return Model.findOne(query);
};

const createData = function (Model, objToSave, callback) {
  return new Model(objToSave).save(callback);
};

const updateData = function (Model, criteria, dataToSet, options, callback) {
  return Model.findOneAndUpdate(criteria, dataToSet, options, callback);
};

const updateMultipleData = function (
  Model,
  criteria,
  dataToSet,
  options,
  callback
) {
  return Model.updateMany(criteria, dataToSet, options, callback);
};

const dataPopulate = function (
  Model,
  criteria,
  project,
  options,
  populateModelArr,
  callback
) {
  return Model.find(criteria, project, options)
    .populate(populateModelArr)
    .exec(callback);
};

const dataAggregation = function (Model, pipeline, callback) {
  return Model.aggregate(pipeline).exec(callback);
};

const dataCount = function (Model, criteria) {
  return Model.countDocuments(criteria);
};

const mongooseType = async (id) => {
  return Mongoose.Types.ObjectId(id);
};

module.exports = {
  getData,
  createData,
  updateData,
  updateMultipleData,
  dataPopulate,
  dataAggregation,
  dataCount,
  getFindOneData,
  mongooseType,
};
