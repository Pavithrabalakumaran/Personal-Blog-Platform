require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

app.use(express.static('public'));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', authRoutes);
app.use('/api', postRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Blog Platform API!');
  });

  app.use(cors({
    origin: 'http://localhost:3000' // Allow only requests from your React app
  }));
  
  // Start the server
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

