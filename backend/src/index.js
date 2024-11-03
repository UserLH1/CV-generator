"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const app_1 = __importDefault(require("./app"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)(); // Load environment variables from .env file
(0, typeorm_1.createConnection)({
    type: 'postgres',
    url: process.env.DATABASE_URL, // Connection string from your .env
    synchronize: true, // Set to false in production
    logging: true,
    entities: ['src/entities/*.ts'], // Path to your entities
    ssl: {
        rejectUnauthorized: false
    }
})
    .then(() => {
    console.log('Connected to the database');
    const PORT = process.env.PORT || 6000;
    app_1.default.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => console.log('Database connection error:', error));
