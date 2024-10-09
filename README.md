
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