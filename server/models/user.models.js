import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    email:{
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password:{
        type: String,
        required: true
    }
}, {timestamps: true})

userSchema.pre("save", async function (next){
    // only hash if it's new or modified
    if(!this.isModified("password")) return next();     

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next()
    } catch (error) {
        next(error)
    }
})

const User = mongoose.model('User', userSchema)
export default User;