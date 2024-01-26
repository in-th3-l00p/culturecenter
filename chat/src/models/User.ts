import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    id: {
        type: Number,
        required: true,
    }, 
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    voice: {
        type: String,
        required: true,
    },
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;