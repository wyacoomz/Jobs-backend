import express from "express";
import cors from "cors";

const app = express();

// Use CORS middleware
app.use(cors());

// Other middlewares
app.use(cors({
  origin: "http://localhost:5173",             // You can replace * with a specific domain like "http://localhost:3000"
  methods: "*",        // Allow only GET requests
}));
// Your route imports
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

export default app;

// dsffdsasdfgdsf  
