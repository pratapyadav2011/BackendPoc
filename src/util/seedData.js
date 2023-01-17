const Models = require('../models');
const services = require('../services/mongoose/MongooseServices');

/*const eventData = [
  {
    EventName: "",
    EventDescription: "",
    Location: "",
    Pin: "",
    FeatureId: "",
  },
  {
    EventName: "",
    EventDescription: "",
    Location: "",
    Pin: "",
    FeatureId: "",
  },
];

const domainData = [
  { DomainName: "Travel and Tourism" },
  { DomainName: "Health" },
];

const featureData = [
  {
    Feature: "cars",
    DomainId: "Travel and Tourism",
  },
  {
    Feature: "gym",
    DomainId: "Health",
  },
];

const scenarioData = [
  {
    FactorsToFilter: "",
    FilterValue: "",
    ScenarioDescription: "",
    EventId: "",
  },
  {
    FactorsToFilter: "",
    FilterValue: "",
    ScenarioDescription: "",
    EventId: "",
  },
];

const wishlistData = [
  {
    UserId: "",
    FeatureId: "",
  },
  {
    UserId: "",
    FeatureId: "",
  },
];*/

const createUsers = async () => {
  const userData = [
    {
      name: 'Ram',
      homePin: '110002',
      officePin: '110003',
      companyName: 'Apple',
      occupation: 'Job',
      location: 'New Delhi',
      dateOfBirth: '1-1-1990',
    },
    {
      name: 'Rohan',
      homePin: '110002',
      officePin: '110003',
      companyName: 'Apple',
      occupation: 'Job',
      location: 'Bangalore',
      dateOfBirth: '1-1-1990',
    },
    {
      name: 'Piyush',
      homePin: '110032',
      officePin: '110090',
      companyName: 'My Company Pvt. Ltd.',
      occupation: 'Business',
      location: 'Bangalore',
      dateOfBirth: '5-1-1993',
    },
  ];
  userData.map(async (obj) => {
    const checkData = await services.getData(
      Models.Users,
      { name: obj.name },
      {},
      {}
    );
    if (checkData.length === 0) {
      const dataInsert = await services.createData(Models.Users, obj);
    }
  });
};

const createDomain = async () => {
  const domainData = [
    {
      name: 'Travel and Tourism',
      isParent: true,
    },
    {
      name: 'Healthcare',
      isParent: true,
    },
  ];
  domainData.map(async (obj) => {
    const checkData = await services.getData(
      Models.Domains,
      { name: obj.name },
      {},
      {}
    );
    if (checkData.length === 0) {
      const dataInsert = await services.createData(Models.Domains, obj);
    }
  });
};

const createSubDomain = async () => {
  const subDomainData = [
    {
      name: 'SubDomain1',
      domainName: 'Travel and Tourism',
    },
    {
      name: 'SubDomain2',
      domainName: 'Travel and Tourism',
    },
    {
      name: 'SubDomain3',
      domainName: 'Healthcare',
    },
    {
      name: 'SubDomain4',
      domainName: 'Healthcare',
    },
  ];
  subDomainData.map(async (obj) => {
    const checkData = await services.getData(
      Models.Domains,
      { name: obj.name },
      {},
      {}
    );
    if (checkData.length === 0) {
      const domainId = await services.getData(
        Models.Domains,
        { name: obj.domainName },
        { _id: 1 },
        {}
      );
      let obj1 = {
        name: obj.name,
        parentId: domainId[0]._id,
      };
      const dataInsert = await services.createData(Models.Domains, obj1);
    }
  });
};

createUsers();
createDomain();
createSubDomain();
