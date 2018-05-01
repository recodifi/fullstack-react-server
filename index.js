const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/db');
require('./models/User');
// connect to database
mongoose.connect(`mongodb://${dbConfig.host}/${dbConfig.db}`);
// init express app
const app = express();
// passport configuration
require('./services/passport.service')(app);
// routes
require('./routes/auth.routes')(app);
// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listen on http://localhost:${PORT}`));