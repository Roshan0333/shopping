import dotenv from "dotenv";
import http from "http";
import app from "./app.js";
import Database from "./config/db.js";
import { initSocket } from "../utlits/socket.js";

dotenv.config(
    {path: "./.env"}
)

const PORT = process.env.PORT;

Database();

const server = http.createServer(app);

initSocket(server)

server.listen(PORT, () => console.log(`Server run on ${PORT} port.`))