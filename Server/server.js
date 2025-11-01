import express from "express"; 
import { configDotenv } from "dotenv";

import { connectToDB } from "./config/db.js";

configDotenv();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.get("/", (req, res) => {
    res.send("API is running...");
});

app.listen(PORT, async() => {
    console.log(`Server running on port ${PORT}`);
    await connectToDB();
});