const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Make sure version 2.x is installed

const app = express();
const PORT = process.env.PORT || 3000;

// 🔁 Use a more reliable Invidious instance
const INSTANCE = 'https://invidious.kavin.rocks';

app.use(cors());

app.get('/api/video/:id', async (req, res) => {
  const videoId = req.params.id;
  const url = `${INSTANCE}/api/v1/videos/${videoId}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch from Invidious instance');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
