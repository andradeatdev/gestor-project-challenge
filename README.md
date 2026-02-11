# Inventory System

This repository contains a full-stack inventory system composed of a Quarkus backend API and a web-based frontend application.

## Project Structure

- `inventory-system-api/`: Contains the Quarkus backend application, responsible for managing inventory data and business logic.
- `inventory-system-web/`: Contains the web frontend application, built with React, providing a user interface to interact with the backend API.
- `compose.yaml`: Docker Compose file for setting up the development environment.

## Getting Started

### Prerequisites

- Java 17+
- Maven 3.8+
- Node.js 18+ (or Bun)
- Docker and Docker Compose

### Backend (inventory-system-api)

To run the Quarkus backend:

1. Navigate to the `inventory-system-api` directory:
   ```bash
   cd inventory-system-api
   ```
2. Run the application in development mode:
   ```bash
   ./mvnw compile quarkus:dev
   ```

The API will be available at `http://localhost:8080`.

### Frontend (inventory-system-web)

To run the web frontend:

1. Navigate to the `inventory-system-web` directory:
   ```bash
   cd inventory-system-web
   ```
2. Install dependencies (using Bun, or npm/yarn):
   ```bash
   bun install
   # or npm install
   # or yarn install
   ```
3. Start the development server:
   ```bash
   bun dev
   # or npm run dev
   # or yarn dev
   ```

The frontend application will be available at `http://localhost:5173` (or another port as specified by Vite).

### Docker Compose

You can use Docker Compose to run both the backend and frontend services:

1. From the root directory of the project, run:
   ```bash
   docker-compose up --build
   ```

This will build and start both the `inventory-system-api` and `inventory-system-web` services, along with any other services defined in `compose.yaml`.

## Demo

A live demo of the application can be found here: [https://gestor-project-challenge-web.onrender.com](https://gestor-project-challenge-web.onrender.com)
