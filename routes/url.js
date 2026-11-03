const express = require('express');
const { handlegenerateNewShortUrl, handleGetAnalytics } = require('../controllers/url');
const router = express.Router();

router.post('/',
    // Logic to shorten the URL
    handlegenerateNewShortUrl
)
router.get('/:shortID/analytics', handleGetAnalytics);
module.exports = router;