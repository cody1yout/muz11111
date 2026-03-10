const axios = require('axios');
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { q } = req.query;
  const CLIENT_ID = process.env.SC_CLIENT_ID;
  try {
    const resp = await axios.get('https://api-v2.soundcloud.com/search/tracks', {
      params: { q, client_id: CLIENT_ID, limit: 15 }
    });
    res.status(200).json(resp.data);
  } catch (e) { res.status(500).send(e.message); }
};