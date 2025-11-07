require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/login', async (req, res) => {
  const { user, password, captchaToken } = req.body;
  const startTime = Date.now();

  try {
    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${captchaToken}`;
    const response = await axios.post(verifyURL);
    const { success } = response.data;

    const captureTime = Date.now() - startTime;

    if (!success) return res.status(400).json({ message: 'CAPTCHA failed', captureTime });

    res.json({ message: 'Login successful', captureTime });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));
