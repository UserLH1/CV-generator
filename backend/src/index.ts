import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

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
