// api/sightings.js
const data = require('./db.json');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow GitHub Pages to access this API
  res.json(data.sightings);
};