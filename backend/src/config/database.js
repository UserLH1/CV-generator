"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CV_1 = require("../entities/CV");
const dbConfig = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: true,
    entities: [CV_1.CV],
};
exports.default = dbConfig;
