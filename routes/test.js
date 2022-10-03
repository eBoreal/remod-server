const testRoutes = (app, fs) => {
    // variables
    const dataPath = './data/test-data.json';

    // READ
    app.get('/test', (req, res) => {
      fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
  
      res.send(JSON.parse(data));
      console.log("replied test query with", JSON.parse(data))

      });
    });
  };
  
  module.exports = testRoutes;