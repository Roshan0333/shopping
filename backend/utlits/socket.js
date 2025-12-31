import { Server } from "socket.io";

let io;

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);

        socket.on("joinItemRoom", (itemID) => {
            if (!itemID) return;
            socket.join(`item:${itemID}`);
            console.log(`Socket ${socket.id} joined item:${itemID}`);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected:", socket.id);
        });
    });

    return io;
};

const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized");
    }
    return io;
};

export { initSocket, getIO };
