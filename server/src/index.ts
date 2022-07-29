import { Order } from "./entities/Order";
import { ProductOrder } from "./entities/ProductOrder";
import { Category } from "./entities/Category";
import { Product } from "./entities/Product";
require("dotenv").config();
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import morgan from "morgan";
import path from "path";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import route from "./routes";
import { mongoose } from "@typegoose/typegoose";
import { __prod__ } from "./constant";
const main = async () => {
  const connection = await createConnection({
    type: "postgres",
    ...(__prod__
      ? { url: process.env.DATABASE_URL }
      : {
          database: "sendo",
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
        }),
    ...(__prod__
      ? {
          extra: {
            ssl: {
              rejectUnauthorized: false,
            },
          },
          ssl: true,
        }
      : {}),
    logging: true,
    ...(__prod__ ? {} : { synchronize: true }),
    entities: [User, Product, Category, Order, ProductOrder],
    migrations: [path.join(__dirname, "./migrations/*")],
  });
  if (__prod__) {
    await connection.runMigrations();
  }
  const app = express();

  app.use(morgan("dev"));
  app.use(
    cors({
      origin: __prod__
        ? process.env.CORS_ORIGIN_PROD
        : process.env.CORS_ORIGIN_DEV,
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "public")));
  const mongoUrl = `mongodb+srv://${process.env.SESSION_DB_USERNAME_DEV}:${process.env.SESSION_DB_PASSWORD_DEV}@reddit.nedcf.mongodb.net/${process.env.SESSION_DB_NAME_DEV}`;
  await mongoose.connect(mongoUrl, {
    w: "majority",
    retryWrites: true,
  });
  console.log("MongoDB connected");

  app.set("trust proxy", 1);

  route(app);

  const httpServer = createServer(app);

  const PORT = process.env.PORT || 4000;

  await new Promise((resolve) =>
    httpServer.listen({ port: PORT }, resolve as () => void)
  );

  console.log(`Server start on PORT ${PORT}`);
};
main().catch((err) =>
  console.error(`Error starting server error ${err.message}`)
);
