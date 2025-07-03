const createUserDoc = ({ name, email, hashedPassword, role }) => {
  return {
    _id: email, // Unique identifier for the user
    name,
    email,
    password: hashedPassword,
    role,
    type: 'user',
    createdAt: new Date().toISOString(),
  };
};

module.exports = { createUserDoc };
