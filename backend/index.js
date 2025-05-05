import { app } from "./app.js";
import dotenv from "dotenv";
import connectDb from "./db/connection.js";

dotenv.config({
    path: "./backend/.env"
})


const port = process.env.PORT || 5001

connectDb()
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}`);
    })
}).catch((error) => {
    console.log("Unable to connect to database", error);
    process.exit(1);
})