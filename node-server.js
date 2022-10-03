const fs = require("fs")  
const bodyParser = require('body-parser');
const app = require('express')()
const port = 8080


// configure our express instance with some body-parser settings
// including handling JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// this is where we'll handle our various routes from
const routes = require('./routes/routes.js')(app, fs);



app.get('/test', (req, res) => {
    res.writeHead(200, { 'content-type': 'application/json' })
    let src = fs.createReadStream("./comment-model.json")
    src.pipe(res)
})

// 192.168.1.14
app.get('/', (req, res) => {
    res.end("server root")
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})