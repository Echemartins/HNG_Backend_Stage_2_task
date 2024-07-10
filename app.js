const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const organisationRoutes = require('./routes/organisationRoutes')
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/api/organisations', organisationRoutes);

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.use((err, req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: 'Server error',
    statusCode: 500,
    error: err
  });
});

const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  module.exports = app; // for testing