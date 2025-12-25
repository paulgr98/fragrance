import express, { json } from "express";
import cors from "cors";
import sequalize from "./config/sequelize.js";

import {
    accordRouter,
    brandRouter,
    noteRouter,
    perfumeRouter
} from "./routes/routers.js";

const app = express();

app.use(cors());
app.use(json());

app.use("/api/accords", accordRouter);
app.use("/api/notes", noteRouter);
app.use("/api/brands", brandRouter);
app.use("/api/perfumes", perfumeRouter);

async function start() {
    try {
        await sequalize.authenticate();
        console.log("Database connected successfully.");

        app.listen(5000, () => {
            console.log("Server is running on port 5000.");
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

start();