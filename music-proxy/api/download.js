const axios = require('axios');
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { url } = req.query;
  try {
    const CLIENT_ID = process.env.SC_CLIENT_ID;
    const track = await axios.get(`https://api-v2.soundcloud.com/resolve?url=${encodeURIComponent(url)}&client_id=${CLIENT_ID}`);
    const stream = await axios.get(`${track.data.media.transcodings[0].url}?client_id=${CLIENT_ID}`);
    res.status(302).redirect(stream.data.url);
  } catch (e) { res.status(500).send(e.message); }
};