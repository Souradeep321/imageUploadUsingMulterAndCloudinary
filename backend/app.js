import express from 'express'
import path from 'path'
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
import connectDb from "./db/connection.js";

dotenv.config({
    path: "./backend/.env"
})

const app = express()
const port = process.env.PORT || 5001
const __dirname = path.resolve();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    })
)
// common middleware
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

//  routes
import productRoutes from "./routes/products.routes.js"

//import routes
app.use("/api/v1/products", productRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

connectDb()
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}`);
    })
}).catch((error) => {
    console.log("Unable to connect to database", error);
    process.exit(1);
})