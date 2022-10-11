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
    return this.find({ url: new RegExp(url+"$", "i")})
}

// export schema as model
module.exports = mongoose.model(MODEL_NAME, commentSchema)