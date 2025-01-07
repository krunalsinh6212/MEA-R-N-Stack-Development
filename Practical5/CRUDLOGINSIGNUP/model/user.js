const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{ 
        type: String, 
        require: true, 
        unique: true
    },
    username: { 
        type: String, 
        require: true
    },
    password: { 
        type: String, 
        require: true, 
        length: 8 
    },
    createdAt: { 
        type: Date, 
        default: Date.now
    }
})
module.exports = mongoose.model("user", userSchema);