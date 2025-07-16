const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.sendStatus(500);
    User.createUser(name, email, hash, (err) => {
      if (err) return res.sendStatus(500);
      res.json({ message: "User registered successfully" });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByEmail(email, (err, results) => {
    if (err || results.length === 0) return res.sendStatus(401);
    bcrypt.compare(password, results[0].password, (err, isMatch) => {
      if (!isMatch) return res.sendStatus(401);
      const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET);
      res.json({ token });
    });
  });
};
