require('dotenv').config()
const bodyParser=require('body-parser');

const mongoose=require('mongoose');

const express=require('express');
const app=express()
const port=80;

// configure our express instance with some body-parser settings
// including handling JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to database: DB_PROD or DB_DEV
mongoose.connect(process.env.DB_DEV
  ).then(() => console.log('Database Connected')
  ).catch(err => console.log('Database not connected', err)
  );


app.use(express.json())

// routes
const commentRouter = require('./routes/comments')
app.use('/comments', commentRouter)


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})