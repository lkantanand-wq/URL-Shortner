const {nanoid }= require('nanoid');
const URL = require('../models/url');
async function handlegenerateNewShortUrl(req, res) {
    const body = req.body;
    if(!body.url) {
        return res.status(400).json({ error: "URL is required" });
    }
  const shortID = nanoid(8);

  await URL.create({
    shortID: shortID,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req.user._id, // Assuming req.user is set by authentication middleware
  })

  // Fetch all URLs created by the user
  const allUrls = await URL.find({ createdBy: req.user._id });
  return res.render('home', { shortID: shortID, urls: allUrls, user: req.user });
}
 
async function handleGetAnalytics(req, res) {
  const shortID = req.params.shortID; 
   const result = await URL.findOne({ shortID: shortID })
   return res.json({ analytics: result.visitHistory.length });
}
module.exports = { handlegenerateNewShortUrl, handleGetAnalytics };