const testRoutes = (app, fs, data_path, Comment) => {
    
    // read local
    const readTestFile = () => {
      let file = fs.readFileSync(data_path, 'utf8')
      return JSON.parse(file)
    }
    
    // post to db
    const postComment = async (commentData) => {
      try {
        let comment = await Comment.create(commentData)
      } catch (e) {
        console.log(e.message)
      }
    }

    // read test file from db
    const getComment = async () => {
      try {
        // query by url
        let data = readTestFile()
        let url = data.url
        let comments = await Comment.findByUrl(url) //.find({ url:url }) // .where(url).equals(url)
        return comments
      } catch (e) {
        console.log(e.message)
      }
    }

    const deleteComment = async () => {
      // query by url
      let data = readTestFile()
      let url = data.url
      Comment.deleteMany( {url:url}, (err) => {
        if (err) console.log(err);
        else console.log("Successful deletion");
      })
    }

    // POST
    app.get('/test-post', (req, res) => {
      let data = readTestFile()
      postComment(data) 
      res.send(data)
      console.log("save to db success")
    })

    // READ
    app.get('/test-read', async (req, res) => {
      let result = await getComment()
      res.send(result)
      console.log("get comment ", result)
    });

    // delete
    app.get('/test-remove', (req, res) => {
      deleteComment();
      res.send("removed")
    });
    
};
  
module.exports = testRoutes;