// utils/db.js
const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');
require('dotenv').config();

let cloudantClient;
const DB_NAME = process.env.CLOUDANT_DB || 'users'; // ✅ Make sure this exists

const connectDB = async () => {
  if (!cloudantClient) {
    const authenticator = new IamAuthenticator({ apikey: process.env.CLOUDANT_APIKEY });
    cloudantClient = CloudantV1.newInstance({ authenticator });
    cloudantClient.setServiceUrl(process.env.CLOUDANT_URL);
    console.log(`✅ Connected to existing database: ${DB_NAME}`);
  }

  return { cloudantClient, usersDb: DB_NAME }; // ✅ Return string, not undefined
};

module.exports = connectDB;
