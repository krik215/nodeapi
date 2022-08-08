const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config({ path: path.resolve(__dirname, './nodeapi.env') });
// import mongoose
const mongoose = require('mongoose');
// load env variables

 
//db connection
mongoose.connect( 
  process.env.MONGO_URI,
  {useNewUrlParser: true}
)
.then(() => console.log('DB Connected'))
 
mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});

const express = require('express');
const app = express();
const morgan = require('morgan');

//bring in routes
const postRoutes = require('./routes/post');

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
/* const Myownmiddleware = (req, res, next) => {
    console.log("Middleware applied")
    next();
};
app.use(Myownmiddleware); */

app.use("/", postRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {console.log(`A node JS API is listening on port: ${port}`)});
