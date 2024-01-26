import { io } from "../server";

io.on("connection", (socket) => {
    console.log("✅ Socket connected: " + socket.id);
    console.log(socket);

    socket.on("send", (data: any) => {
        console.log("📨 Message received: " + data.message);
        io.emit("receive", data); 
    });

    socket.on("disconnect", () => {
        console.log("❌ Socket disconnected: " + socket.id);
    });
});