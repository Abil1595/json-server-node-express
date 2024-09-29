const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample GET endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// Sample POST endpoint
app.post('/api/data', (req, res) => {
  const { name } = req.body;
  res.json({ message: `Hello, ${name}!` });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
