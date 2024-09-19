import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import complaintRoutes from "./routes/complaint.route.js";


dotenv.config();

const app = express();

// Middleware setup
app.use(cors()); // Enable CORS if needed
app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/complaints", complaintRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
