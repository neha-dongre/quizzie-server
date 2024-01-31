const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  // Sanitize user data (if needed)
  const sanitizedUser = {
    // Include only the necessary fields
    id: user.id,
    username: user.username,
    // Add more fields as needed
  };

  return jwt.sign(sanitizedUser, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

module.exports = createAuthToken;
