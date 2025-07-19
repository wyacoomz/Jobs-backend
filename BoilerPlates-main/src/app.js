import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import categoryRouter from './routes/category.route.js';
import subcategoryRouter from "./routes/subcategory.route.js";
import adminRouter from "./routes/admin.route.js";
import { ErrorHandling } from "./middleware/error.middleware.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("tiny"));


//admin panel routes
app.use("/api/admin", adminRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/subcategories", subcategoryRouter);

// auth
app.use("/api/auth", authRoutes);


// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: `URL not found: ${req.originalUrl}` });
});

// Error middleware
app.use(ErrorHandling);



export default app;
