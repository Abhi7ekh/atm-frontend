const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const connectDB = require("../utils/db");

// ===========================
// ✅ REGISTER USER
// ===========================
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const { cloudantClient, usersDb } = await connectDB();

    // ✅ Check if user exists
    const existingUser = await cloudantClient.postFind({
      db: usersDb,
      selector: { email },
    });

    if (existingUser.result.docs.length > 0) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { name, email, password: hashedPassword, role };

    // ✅ Save to DB
    const response = await cloudantClient.postDocument({
      db: usersDb,
      document: newUser,
    });

    return res.status(201).json({
      message: "User registered ✅",
      userId: response.result.id,
    });
  } catch (err) {
    console.error("❌ Register Error:", err.message);
    return res.status(500).json({ error: "Server error during registration" });
  }
};

// ===========================
// ✅ LOGIN USER
// ===========================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const { cloudantClient, usersDb } = await connectDB();

    const result = await cloudantClient.postFind({
      db: usersDb,
      selector: { email },
    });

    const user = result.result.docs[0];

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials ❌" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials ❌" });
    }

    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      message: "Login successful ✅",
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("❌ Login Error:", err.message);
    return res.status(500).json({ error: "Server error during login" });
  }
};
