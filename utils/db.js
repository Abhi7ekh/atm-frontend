// utils/db.js

const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');
require('dotenv').config();

let cloudantClient;
let usersDb;

const connectDB = async () => {
  if (cloudantClient && usersDb) {
    return { cloudantClient, usersDb };
  }

  try {
    const authenticator = new IamAuthenticator({
      apikey: process.env.CLOUDANT_APIKEY,
    });

    cloudantClient = CloudantV1.newInstance({
      authenticator: authenticator,
    });

    cloudantClient.setServiceUrl(process.env.CLOUDANT_URL);

    usersDb = process.env.CLOUDANT_DB || 'users';

    return { cloudantClient, usersDb };
  } catch (err) {
    console.error("❌ Cloudant connection failed:", err);
    throw err;
  }
};

module.exports = connectDB;
