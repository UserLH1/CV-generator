
# CV Generator

This is a web application for generating CVs, built with **React**, **Vite**, and **shadcn/ui** for the frontend, and **Node.js**, **Express.js**, **TypeScript**, and **PostgreSQL** for the backend.

## Requirements

- **Node.js** v14 or newer
- **npm** v6 or newer
- **PostgreSQL** (database hosted on **Neon**)

## Installation

### Cloning the Repository

Clone the GitHub repository:

```bash
git clone https://github.com/UserLH1/CV-generator.git
cd cv-generator
```

### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the application:

   ```bash
   npm run dev
   ```

   The frontend application should be available at `http://localhost:5173`.

### Backend

1. Open a new terminal and navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   - Create a `.env` file in the `backend` directory and add:

     ```
     PORT=5000
     ```


4. Compile and run the backend server:

   - For development (using `ts-node`):

     ```bash
     npm run dev
     ```

   - For production (compile and run):

     ```bash
     npm run build
     npm start
     ```

   The backend server should be available at `http://localhost:5000`.

## Usage

- Open your browser and navigate to `http://localhost:5173` to use the application.
- Interact with the interface to create, view, and manage CVs.
## Docker preview and deployment

Set POSTGRES_PASSWORD and JWT_SECRET in a private .env beside compose.yaml.
Use independent random, URL-safe values. Set CV_PORT if the default loopback
port 18086 is already in use.

    docker compose up -d --build --wait
    curl --fail http://127.0.0.1:18086/api/ready

Place the loopback listener behind HTTPS before accepting public traffic.
Keep PostgreSQL on the Compose network. For per-client authentication
limits behind a reverse proxy, set TRUST_PROXY to the exact immediate
proxy IP as seen by the application and confirm the proxy rewrites forwarded
headers. Login allows 15 requests per 15 minutes and registration allows 8.
The limits are per client IP and held in the app process.

Schedule the backup script with a private destination outside the checkout,
then copy archives off the host into encrypted storage with a retention
policy. A verification run restores to a temporary database and drops it
after checking the schema and reporting the restored row counts.

    CV_BACKUP_DIR=/var/backups/cv-generator bash ops/backup.sh --verify-restore

Point the external HTTPS monitor at /api/ready. It returns HTTP 503 if the
app cannot query PostgreSQL. Test alert delivery and recovery before
accepting public signups.
