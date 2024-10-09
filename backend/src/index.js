"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// // Configurare conexiune la baza de date
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });
// Testare conexiune
// pool.connect((err) => {
//   if (err) {
//     console.error('Eroare la conectarea la baza de date:', err.stack);
//   } else {
//     console.log('Conectat la baza de date PostgreSQL!');
//   }
// });
// Endpoint de test
app.get('/', (req, res) => {
    res.send('Backend-ul funcționează!');
});
// Pornire server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serverul rulează pe portul ${PORT}`);
});
