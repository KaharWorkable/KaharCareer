console.log('IN HERE');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors());

app.get('/routes/admin', (req, res) => {
  if (req.query.check === 'true') {
    // Simulate an admin check
    res.json({ status: 'success' });
  } else {
    res.status(400).json({ error: 'Invalid request' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
