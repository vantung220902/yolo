import { Cart } from './entities/Cart';
import { Category } from './entities/Category';
import { Product } from './entities/Product';
require('dotenv').config()
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from "express";
import { createServer } from 'http';
import morgan from 'morgan';
import path from 'path';
import 'reflect-metadata';
import { createConnection } from "typeorm";
import { User } from './entities/User';
import route from './routes';
const main = async () => {
    await createConnection({
        type: 'postgres',
        database: 'sendo',
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        logging: true,
        synchronize: true,
        entities: [User,Product,Category,Cart]
    })
    const app = express()
    
    app.use(morgan('dev'));
    app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));
    route(app)

    const httpServer = createServer(app)

    const PORT = process.env.PORT || 4000
   
    await new Promise(resolve => httpServer.listen({ port: PORT }, resolve as () => void))

    console.log(`Server start on PORT ${PORT}`)
}
main().catch(err => console.error(`Error starting server error ${err.message}`));