const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - Missing token' });
    }

    console.log('Received token:', token); 
    console.log(process.env.SECRET_KEY, "KEY")

    const decoded = jwt.verify(token,process.env.SECRET_KEY);
    console.log(decoded,  "DECODED")

    const user = await User.findById(decoded.userId);
    console.log(user,  "USER")

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized - Invalid user' });
    }

    req.user = { userId: user._id, role: user.role };
    next();
  } catch (error) {
    console.error('Error authenticating user:', error);
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};
