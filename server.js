const express = require('express');
const { ping, SmtpPingStatus } = require('./index'); // point to actual ping() from repo

const app = express();
app.use(express.json());

app.post('/verify', async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: 'Email required' });

  try {
    const { complete, status, error } = await ping(email);
    res.json({ complete, status, error: error?.message || null });
  } catch (err) {
    res.status(500).json({ error: 'Internal error', message: err.message });
  }
});

app.listen(3000, () => {
  console.log('SMTP Verifier running on port 3000');
});
