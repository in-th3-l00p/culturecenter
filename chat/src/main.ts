import mongoose from "mongoose";
import { app } from "./server";
import bodyParser from "body-parser";
import ChatRoomRouter from "./routes/rooms";

app.use(bodyParser.json());

// routes
app.use("/api/chat/rooms", ChatRoomRouter);

// running
mongoose.connect(process.env.MONGO_URL!)
    .then(() => {
        console.log("✅ MONGO");
    });

app.listen(8003, () => {
    console.log("✅ Server is listening on port " + 8003 + "!");
});