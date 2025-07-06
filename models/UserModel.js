const { cloudant, dbName } = require('../utils/db');

const getUserByEmail = async (email) => {
  try {
    const result = await cloudant.postFind({
      db: dbName,
      selector: { email },
      limit: 1,
    });
    return result.result.docs[0];
  } catch (err) {
    throw err;
  }
};

module.exports = { getUserByEmail };
