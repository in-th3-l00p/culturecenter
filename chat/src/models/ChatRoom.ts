import mongoose, { Schema } from "mongoose";

const ChatRoomSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        refs: "User"
    }],
    messages: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            refs: "User" 
        },
        message: String,
        voicePath: {
            type: String,
            required: false,
        },
    }]
});

const ChatRoom = mongoose.model("ChatRoom", ChatRoomSchema);
export default ChatRoom;