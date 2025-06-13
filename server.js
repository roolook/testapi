const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// List of Invidious instances to try, in order
const INSTANCES = [
  'https://invidious.snopyta.org',
  'https://invidious.kavin.rocks',
  'https://yewtu.be',
  'https://vid.puffyan.us',
];

app.use(cors());

app.get('/api/video/:id', async (req, res) => {
  const videoId = req.params.id;

  // Try each instance one by one
  for (const INSTANCE of INSTANCES) {
    const url = `${INSTANCE}/api/v1/videos/${videoId}`;
    try {
      const response = await fetch(url, { timeout: 5000 });
      if (!response.ok) {
        // If response status is not ok, try next instance
        continue;
      }
      const data = await response.json();
      // Send response and return immediately on first success
      return res.json(data);
    } catch (err) {
      // Ignore error, try next instance
      continue;
    }
  }

  // If no instances worked:
  res.status(500).json({ error: 'Failed to fetch from all Invidious instances' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
