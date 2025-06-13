const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;
const INSTANCE = 'https://vid.puffyan.us';

app.use(cors());

app.get('/api/video/:id', async (req, res) => {
  const videoId = req.params.id;
  const url = `${INSTANCE}/api/v1/videos/${videoId}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch Invidious API');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});