const express = require('express');
const router = express.Router();
const { createJob, getJobs } = require('../controllers/jobController');
const auth = require('../middleware/authMiddleware');

router.post('/jobs', auth, createJob);
router.get('/jobs', getJobs);

module.exports = router;
