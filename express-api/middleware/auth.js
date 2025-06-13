// API Key Authentication Middleware
const apiKey = 'my-secret-api-key'; // You can load this from a .env file

const authenticate = (req, res, next) => {
  const key = req.headers['x-api-key'];
  if (key !== apiKey) {
    return res.status(401).json({ message: 'Unauthorized: Invalid or missing API key' });
  }
  next();
};

module.exports = authenticate;
