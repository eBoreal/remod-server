require('dotenv').config()
const path = require('path')
const bodyParser=require('body-parser');

const mongoose=require('mongoose');

const express=require('express');
const app=express()
const port=5000;

// configure our express instance with some body-parser settings
// including handling JSON data
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to database: DB_PROD or DB_DEV
mongoose.connect(process.env.DB_PROD
  ).then(() => console.log('Database Connected')
  ).catch(err => console.log('Database not connected', err)
  );


// create a GET route
// app.get('/', (req, res) => res.status(201).json("Welcome to Remod API")
// )

app.use(express.static(path.join(__dirname, "..", "remod-client", "build")));
// app.use(express.static("public"));
// create a GET route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "remod-client", "build", "index.html"));
}
)

// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "..", "remod-client", "build", "index.html"));
// });


// app.get('/remod',function(req,res) {
//     res.sendFile(path);
//   });


// Website routes
app.get('/api', (req, res) => res.status(201).json("Welcome to Remod API"))

// API routes
const commentRouter = require('./routes/comments')
app.use('/api/comments', commentRouter)

const userRouter = require('./routes/users')
app.use('/api/users', userRouter)




app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
