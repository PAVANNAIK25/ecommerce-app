import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    password: {
        type: String, require: true
        // validate: {
        //     validator: function(value){
        //         return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(value)
        //     },
        //     message: "Password must be 8-12 characters long"
        // }/

    },
    type: { type: String, enum: ['Customer', 'Seller'] }
});

export const userModel = mongoose.model('users', userSchema);