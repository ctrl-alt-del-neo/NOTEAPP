import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(bodyParser.json());
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// MLh2SNHcWnPA07lE
// gabrielvarulkar20_db_user
// mongodb+srv://gabrielvarulkar20_db_user:MLh2SNHcWnPA07lE@cluster0.igl2os9.mongodb.net/?appName=Cluster0
