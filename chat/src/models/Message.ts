import mongoose, { Schema, mongo } from "mongoose";

const MessageSchema = new Schema({
    userId: Number,
    message: String,
    voicePath: {
        type: String,
        required: false,
    }
});

export default mongoose.model("Message", MessageSchema);