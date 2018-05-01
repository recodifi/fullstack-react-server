const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/db');
require('./models/User');
require('./services/passport.service');

mongoose.connect(`mongodb://${dbConfig.host}/${dbConfig.db}`);

const app = express();

require('./routes/auth.routes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listen on http://localhost:${PORT}`));