// test routes
const testRoutes = require('./test');
const Comment=require("../schemas/Comment.js");
const data_path='./data/test-data.json';

const appRouter = (app, fs) => {
  // default
  app.get('/', (req, res) => {
    res.send('welcome to the development api-server');
  });

  // run our test route module
  testRoutes(app, fs, data_path, Comment);
  // dbRoutes(app, mongoose);
};

module.exports = appRouter;