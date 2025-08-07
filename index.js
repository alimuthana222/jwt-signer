const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;

app.post('/sign-jwt', (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).send('Missing email');

  const token = jwt.sign(
    {
      sub: email,
      email: email,
      role: 'authenticated',
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

app.get('/', (req, res) => {
  res.send('JWT Signer is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running on port ${PORT}');
});
