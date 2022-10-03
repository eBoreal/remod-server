// test routes
const testRoutes = require('./test');

const appRouter = (app, fs) => {
  // default
  app.get('/', (req, res) => {
    res.send('welcome to the development api-server');
  });

  // run our test route module
  testRoutes(app, fs);
};

module.exports = appRouter;