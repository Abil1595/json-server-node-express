const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection URI (replace <username>, <password>, <cluster-url>, and <database>)
const mongoURI = 'mongodb+srv://Abilash:XDcHc4zDuN5bI12y@merncart.l6mh2.mongodb.net/?retryWrites=true&w=majority&appName=Merncart';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Define a simple schema and model
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

// Sample GET endpoint
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Sample POST endpoint
app.post('/api/data', async (req, res) => {
  const { name } = req.body;

  const user = new User({ name });
  try {
    await user.save();
    res.status(201).json({ message: `User ${name} added successfully!` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
