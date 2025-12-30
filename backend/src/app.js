import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser"
import itemRoutes from "./routers/item.route.js";
import cartRoutes from "./routers/cart.route.js";
import authRoutes from "./routers/auth.route.js";
import checkItemQuantityRoutes from './routers/checkItemQuantity.route.js';
import buyRoutes from "./routers/buy.route.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/shopping/auth", authRoutes)
app.use("/api/v1/shopping/item", itemRoutes);
app.use("/api/v1/shopping/cart", cartRoutes);
app.use("/api/v1/shopping/itemAvailable", checkItemQuantityRoutes);
app.use("/api/v1/shopping/buyItem", buyRoutes);

export default app;