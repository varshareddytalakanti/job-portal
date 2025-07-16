const db = require('../config/db');

const createUser = (name, email, hashedPassword, callback) => {
  db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword], callback);
};

const findUserByEmail = (email, callback) => {
  db.query("SELECT * FROM users WHERE email = ?", [email], callback);
};

module.exports = { createUser, findUserByEmail };
