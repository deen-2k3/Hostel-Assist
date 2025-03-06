import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import complaintRoutes from "./routes/complaint.route.js";
import applicationRoutes from './routes/complaintApplication.route.js';  // Adjust the path if necessary
import lostFoundRoutes from "./routes/LostAndFound.route.js"; // Import the routes

dotenv.config();

const app = express();

// Middleware setup
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true, // Allow cookies to be sent and stored
  })
);
// Enable CORS if needed
app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/comp", complaintRoutes);
app.use('/api/v1/app', applicationRoutes);  // Prefix the routes with `/api/v1` for versioning
app.use("/api/v1/LostAndFound",lostFoundRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
