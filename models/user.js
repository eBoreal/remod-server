const mongoose=require('mongoose')
  
MODEL_NAME = 'User'

// schema
const userSchema = new mongoose.Schema({
    userId: {type: String, unique: true, required: true},
    passWord: {type: String, required: true},
    legend: String,
    createdAt: {
        type: Date,
        immutable: true, 
        default: () => Date.now()
    }
})

userSchema.statics.findById = function (userId) {
    return this.find({ userId: new RegExp(userId+"$", "i")})
}

// export schema as model
module.exports = mongoose.model(MODEL_NAME, userSchema)