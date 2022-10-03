const fs = require("fs")  
const bodyParser = require('body-parser');
const app = require('express')()
const port = 8080


// configure our express instance with some body-parser settings
// including handling JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// handle routes
const routes = require('./routes/routes.js')(app, fs);



// app.get('/test', (req, res) => {
//     res.writeHead(200, { 'content-type': 'application/json' })
//     let src = fs.createReadStream("./comment-model.json")
//     src.pipe(res)
// })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})