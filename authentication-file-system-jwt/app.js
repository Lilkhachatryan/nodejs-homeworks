const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const authRoutes = require('./src/routes/auth');
// const privateRoutes = require('./src/routes/private');
// const { authenticateJWT } = require('./src/services/authService');

const routes = require('./src/routes/routes');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// app.use('/api/auth', authRoutes);
// app.use('/api/private', authenticateJWT, privateRoutes);

app.use('/api/v1', routes);

const port = process.env.PORT || 5000;

app.listen(port, (() => console.log(`Server started on port ${port}`)));
