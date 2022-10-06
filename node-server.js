const fs=require('fs');
const bodyParser=require('body-parser');

const mongoose=require('mongoose');
const config=require(('config'))
const dbConfig=config.get('eBoreal.dbConfig.dbProd') // dbDev
const { userInfo } = require('os');

const app=require('express')();
const port=8080;

// configure our express instance with some body-parser settings
// including handling JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to database
mongoose.connect(dbConfig
  ).then(() => console.log('Database Connected')
  ).catch(err => console.log('Database not connected', err)
  );

// routes
const routes = require('./routes/routes.js')(app, fs);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})