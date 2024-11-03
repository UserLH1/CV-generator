"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const cv_1 = __importDefault(require("../src/routes/cv"));
require("reflect-metadata");
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use((0, body_parser_1.json)());
// Routes
app.use('/api/cv', cv_1.default);
exports.default = app;
