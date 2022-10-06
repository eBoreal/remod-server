const mongoose=require('mongoose')
  
MODEL_NAME = 'Comment'

const targetSchema = new mongoose.Schema({
    innerText: String,
    localName: String,
    id: String
})

// schema
const commentSchema = new mongoose.Schema({
    id: Number,
    url: String,
    target: targetSchema,
    boxId: Number,
    commentText: String,
    author: String, 
    timeStamp: Date,
    upvotes: Number,
    createdAt: {
        type: Date,
        immutable: true, 
        default: () => Date.now()
    }
})

commentSchema.statics.findByUrl = function (url) {
    return this.find({ url: new RegExp(url, "i")})
}

// schema to model
const Comment = mongoose.model(MODEL_NAME, commentSchema)

// // document instance of model
// const testInstance = new Comment({
//     "_id": 123456,
//     "url": "https://vitalik.ca/general/2022/07/13/networkstates.html",
//     "target": {
//         "innerText": "Network states can be viewed as an attempt at an ideological successor to libertarianism: Balaji",
//         "localName": "p",
//         "id": ""
//     },
//     "boxId":987655,
//     "commentText": "I am server comment #1",
//     "author": "Emile Borel", 
//     "timeStamp": 1664750827,
//     "upvotes": 0
// })

module.exports = Comment