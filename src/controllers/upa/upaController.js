const models = require("../../models");
const { dbService } = require("../../services");
const { STATUS } = require("../../constants/constants");
const Mongoose = require("mongoose");
const fs = require("fs");
const tokenSource = require("./user_tokens.json");
const firebase_admin = require("firebase-admin");

const admin = firebase_admin.initializeApp();

const getUsersFromFeature = async (FeatureId) => {
  try {
    const userList = await dbService.getFindOneData(models.Features, {
      _id: FeatureId,
    });
    // console.log("user->", userList);
    return userList;
  } catch (error) {
    console.log(error);
    if (error.statusCode && error.message) return error;
    else {
      return STATUS.ERROR.SOMETHING_WENT_WRONG;
    }
  }
};

const checkForScenario = async (EventId) => {
  try {
    const ifScenarioExists = await dbService.getFindOneData(models.Scenarios, {
      EventId,
    });
    return ifScenarioExists;
  } catch (error) {
    console.log(error);
    if (error.statusCode && error.message) return error;
    else {
      return STATUS.ERROR.SOMETHING_WENT_WRONG;
    }
  }
};

const checkForEvent = async (EventId) => {
  try {
    const ifEventExists = await dbService.getFindOneData(models.Events, {
      _id: EventId,
    });
    return ifEventExists;
  } catch (error) {
    console.log(error);
    if (error.statusCode && error.message) return error;
    else {
      return STATUS.ERROR.SOMETHING_WENT_WRONG;
    }
  }
};

const filterUsersFromScenario = async (
  factorToFilter,
  filterValue,
  userList
) => {
  try {
    //scenario specific users nikalne hai
    let pipeline = [];
    // { $match: { _id: { $in: userList } }, factorToFilter: filterValue },
    if (userList) pipeline.push({ $match: { _id: { $in: userList } } });
    pipeline.push({ $match: { factorToFilter: filterValue } });
    const filteredUsers = await dbService.dataAggregation(
      models.Users,
      pipeline
    );
    console.log(filterUsers);
    return filteredUsers;
  } catch (error) {
    console.log(error);
    if (error.statusCode && error.message) return error;
    else {
      return STATUS.ERROR.SOMETHING_WENT_WRONG;
    }
  }
};

const notifyUsers = async (userList) => {
  const templateId = "T001";
  const req = {
    body: {
        title: 'from scenario',
        body: 'from scenario', 
        metadata: {
            templateId
        }
    }
  }
    sendFirebaseMessage(req)
    console.log("notify kardiya->", userList);
};

const addEvent = async (req) => {
  const { EventName, EventDescription, Location, Pin, FeatureId } = req.body;
  try {
    const newEvent = await dbService.createData(models.Events, req.body);
    console.log(newEvent);

    const filteredUserFromfid = await getUsersFromFeature(newEvent.FeatureId);
    console.log(filteredUserFromfid);

    const checkScenario = await checkForScenario(newEvent._id); // will not be true always
    if (checkScenario) {
      console.log("scenario exists");
    } else if (!checkScenario) {
      console.log("scenario does not exists");
      await notifyUsers(filteredUserFromfid.UserIds);
    }

    STATUS.SUCCESS.CUSTOM_MESSAGE;
    return STATUS.SUCCESS.CUSTOM_MESSAGE;
  } catch (error) {
    console.log(error);
    if (error.statusCode && error.message) return error;
    else {
      return STATUS.ERROR.SOMETHING_WENT_WRONG;
    }
  }
};

const addUser = async (req) => {
  try {
    const user = await dbService.createData(models.Users, req.body);
    STATUS.SUCCESS.CUSTOM_MESSAGE.data = user;
    return STATUS.SUCCESS.CUSTOM_MESSAGE;
  } catch (error) {
    console.log(error);
    if (error.statusCode && error.message) return error;
    else {
      return STATUS.ERROR.SOMETHING_WENT_WRONG;
    }
  }
};

const addDomain = async (req) => {
  try {
    const user = await dbService.createData(models.Domains, req.body);
    STATUS.SUCCESS.CUSTOM_MESSAGE.data = user;
    return STATUS.SUCCESS.CUSTOM_MESSAGE;
  } catch (error) {
    console.log(error);
    if (error.statusCode && error.message) return error;
    else {
      return STATUS.ERROR.SOMETHING_WENT_WRONG;
    }
  }
};

// const addWishlist = async (req) => {
//   try {
//     const user = await dbService.createData(models.Wishlist, req.body);
//     STATUS.SUCCESS.CUSTOM_MESSAGE.data = user;
//     return STATUS.SUCCESS.CUSTOM_MESSAGE;
//   } catch (error) {
//     console.log(error);
//     if (error.statusCode && error.message) return error;
//     else {
//       return STATUS.ERROR.SOMETHING_WENT_WRONG;
//     }
//   }
// };

const addFeature = async (req) => {
  try {
    const user = await dbService.createData(models.Features, req.body);
    STATUS.SUCCESS.CUSTOM_MESSAGE.data = user;
    return STATUS.SUCCESS.CUSTOM_MESSAGE;
  } catch (error) {
    console.log(error);
    if (error.statusCode && error.message) return error;
    else {
      return STATUS.ERROR.SOMETHING_WENT_WRONG;
    }
  }
};

const addScenario = async (req) => {
  try {
    const {
      applicableGroup,
      scenarioDescription,
      domainId,
      subDomainId,
      parameterJson,
    } = req.body;
    let keys = Object.keys(applicableGroup);
    let values = Object.values(applicableGroup);
    console.log("keys", keys);
    console.log("values", values);
    /*let pipeline = [
          {$match:{
                  wishList:{$in:[Mongoose.Types.ObjectId(domainId),Mongoose.Types.ObjectId(subDomainId)]}
              }}
      ];*/

    let matchObj = {
      wishList: {
        $in: [
          Mongoose.Types.ObjectId(domainId),
          Mongoose.Types.ObjectId(subDomainId),
        ],
      },
    };

    if (applicableGroup.companyName) {
      matchObj["companyName"] = { $in: applicableGroup.companyName };
    }
    if (applicableGroup.location) {
      matchObj["location"] = { $in: applicableGroup.location };
    }
    if (applicableGroup.occupation) {
      matchObj["occupation"] = { $in: applicableGroup.occupation };
    }

    let pipeline = [{ $match: matchObj }];
    console.log("d", pipeline);
    const userData = await dbService.dataAggregation(models.Users, pipeline);

    /* let obj = {
          targetAudience:{
              factorsToFilter:factorsToFilter,
              filterValue:filterValue,
              scenarioDescription:scenarioDescription,
              domainId:domainId,
              subDomainId:subDomainId,
              parameterJson:parameterJson
          }
      };*/

    // const scenario = await dbService.createData(models.Scenarios, obj);
    // filter users by filter value
    /*const filteredUsers = await filterUsersFromScenario(
      scenario.FactorToFilter,
      scenario.FilterValue
    );*/

    /*const ifEvent = await checkForEvent(scenario.EventId);
    if (ifEvent) {
      // filter based on their liked feature id
      const usersList = await getUsersFromFeature(ifEvent.FeatureId); // intersect
    } else if (!ifEvent) {
      //notify filteredUsers
      await notifyUsers(filteredUsers);
    }*/
    await notifyUsers(userData);
    STATUS.SUCCESS.CUSTOM_MESSAGE.data = userData;
    return STATUS.SUCCESS.CUSTOM_MESSAGE;
  } catch (error) {
    console.log(error);
    if (error.statusCode && error.message) return error;
    else {
      return STATUS.ERROR.SOMETHING_WENT_WRONG;
    }
  }
};

const subscribeFeature = async (req) => {
  const { userId, featureIds } = req.body;
  try {
    // add features to users model
    const dataToSet = {
      //   $addToSet: { FeatureIds: { $each: featureIds } },
      FeatureIds: featureIds,
    };
    const data = await dbService.updateData(
      models.Users,
      { _id: userId },
      dataToSet,
      { new: true }
    );

    // add users to feature model
    const addUsers = await addUsersToFeatures(userId, featureIds);
    STATUS.SUCCESS.CUSTOM_MESSAGE.data = data;
    return STATUS.SUCCESS.CUSTOM_MESSAGE;
  } catch (error) {
    console.log(error);
  }
};

const addUsersToFeatures = async (userId, featureIds) => {
  try {
    const removeFeatures = await dbService.updateMultipleData(
      models.Features,
      { UserIds: { $in: [userId] } },
      { $pull: { UserIds: userId } },
      { new: true }
    );

    const dataToSet = {
      $addToSet: { UserIds: userId },
    };
    const data = await dbService.updateMultipleData(
      models.Features,
      { _id: { $in: featureIds } },
      dataToSet,
      { new: true }
    );
  } catch (error) {
    console.log(error);
  }
};

const storeFirebaseToken = (req) => {
  const { token: newToken } = req.body;
  console.log('received token', newToken)
  if (newToken) {
    try {
      tokenSource[0].token = newToken;
      fs.writeFileSync(
        "src/controllers/upa/user_tokens.json",
        JSON.stringify(tokenSource, null, 2)
      );
    } catch (e) {
      console.error("Failed to write", e);
    }
  } else {
  }
};

const sendFirebaseMessage = async (req) => {
  return new Promise(async (res, rej) => {
    const { title, body, metadata } = req.body;
    if (!title || !body) {
      // throw new Error('Invalid message format')
      console.log("rejecting");
      rej("invalid message format");
    }
    console.log('fcm token', tokenSource[0].token)
    try {
      const result = await admin
        .messaging()
        .send({
          notification: { title, body },
          data: metadata,
          token: tokenSource[0].token,
        }).catch(e => {
            console.error('failed to send', e)
        })

      res(result);
    } catch (er) {
      console.log("error sending message", er);
      rej("error sending message");
    }
  });
};

module.exports = {
  addEvent,
  addUser,
  addDomain,
  //   addWishlist,
  addFeature,
  addScenario,
  subscribeFeature,
  storeFirebaseToken,
  sendFirebaseMessage,
};
