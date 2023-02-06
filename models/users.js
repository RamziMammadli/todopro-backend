const { default: mongoose } = require("mongoose");

const { Schema } = mongoose

const UsersSchema = new Schema({
    fullname: String,
    userId: String,
    username: String,
    email: String,
    password: String,
    confirmEmail: String,
    isDeleted: {
        type: Boolean,
        default: false
    },
    addDate: {
        type: Date,
        default: Date.now()
    }
})


const UserModel = mongoose.model('user', UsersSchema);

module.exports = {
    UserModel
}