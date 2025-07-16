const Job = require('../models/jobModel');

exports.createJob = (req, res) => {
  const { title, company } = req.body;
  Job.createJob(title, company, req.user.id, (err) => {
    if (err) return res.sendStatus(500);
    res.json({ message: "Job posted" });
  });
};

exports.getJobs = (req, res) => {
  Job.getJobs((err, results) => {
    if (err) return res.sendStatus(500);
    res.json(results);
  });
};
