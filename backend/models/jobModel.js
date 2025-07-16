const db = require('../config/db');

const createJob = (title, company, userId, callback) => {
  db.query("INSERT INTO jobs (title, company, user_id) VALUES (?, ?, ?)", [title, company, userId], callback);
};

const getJobs = (callback) => {
  db.query("SELECT * FROM jobs", callback);
};

module.exports = { createJob, getJobs };
