import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware to authenticate and get the logged-in user's info
export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
// console.log(token);

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id); 
    // console.log("req.user",req.user);
    
    // Attach user to the request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
export const authorize = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};
export const protect = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized, please log in' });
  }
  next();
};


// Middleware to check if the user is a manager
export const isManager = (req, res, next) => {
  if (req.user.role !== 'manager') {
    return res.status(403).json({ message: 'Not authorized as manager' });
  }
  next();
};

export const adminOnly = async (req, res, next) => {
  try {
      // Extract token from the authorization header
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
          return res.status(401).json({ message: 'Authentication token is missing.' });
      }

      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
          return res.status(401).json({ message: 'Invalid or expired token.' });
      }

      // Fetch the user to verify their role
      const user = await User.findById(decoded.id);
      if (!user) {
          return res.status(404).json({ message: 'User not found.' });
      }

      // Check if the user is an admin
      if (user.role !== 'admin') {
          return res.status(403).json({ message: 'Access denied. Admins only.' });
      }

      // Attach user to the request object
      req.user = user;
      next();
  } catch (error) {
      res.status(500).json({ message: 'Server error.', error: error.message });
  }
};