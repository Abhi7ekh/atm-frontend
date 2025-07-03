// controllers/authController.js
const { IamAuthenticator } = require('ibm-cloud-sdk-core');
const { CloudantV1 } = require('@ibm-cloud/cloudant');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// ✅ Initialize Cloudant
const cloudant = CloudantV1.newInstance({
  authenticator: new IamAuthenticator({
    apikey: process.env.CLOUDANT_APIKEY,
  }),
  serviceUrl: process.env.CLOUDANT_URL,
});

const dbName = process.env.CLOUDANT_DB;

// ✅ REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = await cloudant.getDocument({ db: dbName, docId: email }).catch(() => null);

    if (existingUser?.result) {
      return res.status(400).json({ error: "User already exists ❌" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      _id: email,
      username,
      email,
      password: hashedPassword,
      role,
      createdAt: new Date().toISOString(),
    };

    const response = await cloudant.postDocument({ db: dbName, document: newUser });

    res.status(201).json({
      message: "User registered successfully ✅",
      id: response.result.id,
    });
  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({ error: "Server error during registration ❌" });
  }
};

// ✅ LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userDoc = await cloudant.getDocument({ db: dbName, docId: email }).catch(() => null);

    if (!userDoc?.result) {
      return res.status(401).json({ error: "Invalid credentials ❌" });
    }

    const user = userDoc.result;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials ❌" });
    }

    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      message: "Login successful ✅",
      token,
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ error: "Server error during login ❌" });
  }
};

// ✅ Export functions
module.exports = {
  registerUser,
  loginUser,
};
