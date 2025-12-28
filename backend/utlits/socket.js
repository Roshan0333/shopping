import { Server } from "socket.io";

let io;

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*"
        },
    });

    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);

        socket.on("joinItemRoom", (itemID) => {
            socket.join(itemID);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected:", socket.id)
        });
    });

    return io

}

const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not  initialized");
    }

    return io;
};

export { initSocket, getIO };