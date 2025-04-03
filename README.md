# Serviz SaaS Platform

This repository contains the complete Serviz SaaS platform, including the backend server, Vue.js frontend, and database components. This project was created for me to play around with Cursor AI.

## Prerequisites

- Docker and Docker Compose
- Node.js (v14 or higher)
- npm (v6 or higher)

## Project Structure

```
serviz-saas/
├── database/           # Database configuration and migrations
├── serviz-saas-backend/ # Backend server
├── web-vue/           # Vue.js frontend application
```

## Getting Started

### 1. Database Setup

The project uses Docker Compose for database management. Follow these steps to set up the database:

```bash
# Navigate to the database directory
cd database

# Copy the example environment file and update the values
cp .env.example .env

# Start the database and pgAdmin containers
docker-compose up -d
```

This will start:

- PostgreSQL database on port 5432
- pgAdmin interface on port 5050

Make sure to update the following environment variables in your `.env` file:

- `POSTGRES_DB`: Database name
- `POSTGRES_USER`: Database user
- `POSTGRES_PASSWORD`: Database password
- `PGADMIN_EMAIL`: pgAdmin login email
- `PGADMIN_PASSWORD`: pgAdmin login password

### 2. Backend Server

The backend server is built with Node.js. To start the server:

```bash
# Navigate to the backend directory
cd serviz-saas-backend

# Install dependencies
npm install

# Start the server
npm start
```

### 3. Frontend Application (Vue.js)

The main frontend application is built with Vue.js. To run the development server:

```bash
# Navigate to the Vue.js project directory
cd web-vue

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Development

- Backend server runs on: `http://localhost:3000`
- Vue.js frontend runs on: `http://localhost:3003`
- Database runs on: `localhost:5432`

## Additional Information

- For detailed API documentation, visit the backend server's documentation endpoint
- The project includes both Vue.js and React frontends, with Vue.js being the current primary frontend
- Database migrations and seeds are managed through the database directory

## Support

For any issues or questions, please open an issue in the repository.
