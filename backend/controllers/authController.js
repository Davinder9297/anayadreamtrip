import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { uploadImage } from '../utils/cloudinary.js';

const register = async (req, res) => {
  const { name, email, password, role, panNumber, aadhaarNumber } = req.body;
  const panImage = req.files?.panImage?.[0];
  const aadhaarImage = req.files?.aadharImage?.[0];

  try {
    // Check if the email already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the role is valid (either 'user', 'manager', or 'admin')
    if (role && !['user', 'manager', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role, must be either "user", "manager" or "admin"' });
    }

    // Check if the role is 'manager' and required fields are provided
    if (role === 'manager') {
      if (!panNumber || !aadhaarNumber) {
        return res.status(400).json({ message: 'PAN and Aadhaar numbers are required for managers' });
      }

      if (!panImage || !aadhaarImage) {
        return res.status(400).json({ message: 'PAN and Aadhaar images are required for managers' });
      }

      // Upload PAN and Aadhaar images if provided
      const panImageUrl = await uploadImage(panImage);
      const aadhaarImageUrl = await uploadImage(aadhaarImage);

      // Create manager with their PAN and Aadhaar details
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role: 'manager',
        panNumber,
        aadhaarNumber,
        panImage: panImageUrl,
        aadhaarImage: aadhaarImageUrl,
      });

      await newUser.save();
      return res.status(201).json({ message: 'Manager registered successfully', user: newUser });
    }

    // For 'user' and 'admin', we don't require PAN and Aadhaar info
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    // Compare the password with the hashed password in the database
    // const isMatch = await bcrypt.compare(password.trim(), user.password);  // Use .trim() to avoid issues with spaces
    // console.log(password.trim(), user.password);
    bcrypt.hash(password, 10, function(err, hash) {
      if (err) { throw (err); }
  
      bcrypt.compare(password, hash, function(err, result) {
          if (err) { throw (err); }
          // console.log(result);
          if (!result) return res.status(400).json({ message: 'Invalid email or password' });

      });
  });

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { register, login };
