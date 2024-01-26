import mongoose from "mongoose";
import { app, redis } from "./server";
import bodyParser from "body-parser";
import ChatRoomRouter from "./routes/rooms";
import MessageRouter from "./routes/chat";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// listening
// redis.connect().then(() => {
//     console.log("✅ REDIS");
//     redis.subscribe("registered", (user) => {
//         console.log(user);
//     });

//     redis.on("error", (err) => {
//         console.log("❌ REDIS: " + err);
//     });
// });

// routes
app.use("/api/chat/rooms", ChatRoomRouter);
app.use("/api/chat/messages", MessageRouter);

// running
mongoose.connect(process.env.MONGO_URL!)
    .then(() => {
        console.log("✅ MONGO");
    });

app.listen(8003, () => {
    console.log("✅ Server is listening on port " + 8003 + "!");
});