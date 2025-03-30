// api/sightings.js
const data = require('./db.json');

module.exports = async (req, res) => {
  try {
    // Set timeout to 5 seconds (max is 10s on free tier)
    const timeout = setTimeout(() => {
      res.status(504).json({ error: "Timeout" });
    }, 5000);

    // Send response
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(data.sightings || data);
    
    clearTimeout(timeout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};