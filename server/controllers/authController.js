const sendAdminRequestMail = require('../utils/sendAdminRequestMail');
const User = require('../models/User');
const { createToken, setTokenCookie, clearTokenCookie } = require('../utils/token');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    if (await User.findOne({ email })) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const user = await User.create({
      name,
      email,
      password,         
      role: 'user',     
      adminRequestStatus: role === 'admin' ? 'pending' : 'none'
    });

    if (role === 'admin') {
      await sendAdminRequestMail(user);
    }

    res.status(201).json({
      message: 'User registered. Awaiting admin approval if requested.',
      user: { id: user._id, email, role: user.role }
    });

  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
};

exports.login = async (req, res) => {
  const { email, password, remember } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isValid = await user.comparePassword(password);  
    if (!isValid) return res.status(400).json({ message: 'Incorrect password' });

    if (user.adminRequestStatus==='pending'){
      return res.status(403).json({ message: 'Your request to become admin is pending. You can login after approval by Super Admin.' });
    }

    if (user.adminRequestStatus === 'rejected') {
      return res.status(403).json({ message: 'Your request to become admin was rejected. You are not allowed to log in.' });
    }

    const token = createToken(user);
    setTokenCookie(res, token, remember);
    res.json({ token, role: user.role, message: 'Logged in' });

  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
};

exports.verify = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.json({ valid: true, user: req.user });
};

exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ message: "Logged out" });
};