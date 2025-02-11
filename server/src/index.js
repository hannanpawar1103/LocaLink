import dotenv from "dotenv";
import connectDB from './db/MongooseDb.js'
import { app } from "./app.js";

dotenv.config({
    path: "./env"
})

connectDB()
.then(() => {
    app.on('error',(error) => {
        console.error('Error In app.on',error);
    })
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})
.catch((error) => {
    console.error('CONNECTION FAILED',error);
})