const mongoose=require('mongoose')
  
MODEL_NAME = 'Comment'

const targetSchema = new mongoose.Schema({
    innerText: String,
    localName: String,
    id: String
})

// schema
const commentSchema = new mongoose.Schema({
    id: String,
    url: String,
    target: targetSchema,
    boxId: String,
    text: String,
    userId: String, 
    timeStamp: Date,
    upvotes: Number,
    rgb1: { type : Array , "default" : [] },
    rgb2: { type : Array , "default" : [] },
    createdAt: {
        type: Date,
        immutable: true, 
        default: () => Date.now()
    }
})

commentSchema.statics.findByUrl = function (url) {
    return this.find({ url: new RegExp(url+"$", "i") })
}

commentSchema.statics.findByUser = function (userId) {
    return this.find({ userId: new RegExp(userId+"$") })
}

// export schema as model
module.exports = mongoose.model(MODEL_NAME, commentSchema)