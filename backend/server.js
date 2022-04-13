const exp = require("constants");
const express = require('express');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/map', require('./routes/mapRoutes.js'))
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))