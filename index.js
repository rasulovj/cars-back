import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import morgan from "morgan";
import cors from "cors";

dotenv.config();
connectDb();

const app = express();
const PORT = process.env.PORT || 8080;

const allowedOrigins = ["http://localhost:3000", process.env.FRONTEND_URL];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
