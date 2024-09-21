import express, { Express } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"; 
import adminRoutes from "./routes/admin/admin";
import userRoutes from "./routes/user/user";
import postRoutes from "./routes/post/post";
import subscriberRouter from "./routes/subscriber/subscriber";
import s3Router from "./routes/s3Services/s3services";
import categoryRouter from "./routes/category/category";
import notificationRouter from "./routes/notification/notification";

dotenv.config();

const app: Express = express();

// Middleware setup
// console.log("client url:-",process.env.CLIENT_URL)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // Use cookie-parser middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true })); 


// Test route
app.get("/", (req, res, next) => {
  res.send("Hello from server..");
});

// Routes
app.use("/api/v1/subscriber", subscriberRouter);
app.use("/api/v1/auth/admin", adminRoutes);
app.use("/api/v1/auth/user", userRoutes);
app.use( "/api/v1/post", postRoutes );
app.use( "/api/v1/aws", s3Router );
app.use( '/api/v1/category', categoryRouter )
app.use( '/api/v1/notification', notificationRouter );


// Database connection and server start
const start = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}`);
    app.listen(8000, () =>
      console.log(`⚡️[server]: Server is running at http://localhost:8000 and connected with database`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
