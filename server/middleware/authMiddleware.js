// Placeholder for JWT authentication middleware

const protect = async (req, res, next) => {
  // TODO: Implement token verification logic later
  // For now, it just passes to the next middleware
  next();
};

module.exports = { protect };
