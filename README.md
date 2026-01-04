# POS-4

POS-4 is a modern Point of Sale (POS) system focused on improving authentication flow, secure session handling, and integrating Stripe-based payments. This project was built as a full-stack application with a clear separation between frontend and backend, following real-world development practices.

---

## Overview

This project demonstrates a production-style POS system with:
- Secure authentication and authorization
- Hardened session management between frontend and backend
- Stripe payment integration for checkout flow
- Modular frontend and backend architecture

It is designed as a portfolio-level project that goes beyond basic CRUD functionality.

---

## Features

- User authentication (login / register)
- Protected routes using session and token validation
- Secure backend API with middleware verification
- Stripe payment processing (test mode supported)
- Order creation and payment status handling
- Clean and responsive POS user interface

---

## Project Structure

POS-4/
├── pos-frontend/ # Frontend (React)
├── pos-backend/ # Backend (Node.js / Express)
├── .vscode/ # VS Code settings
├── POS.code-workspace # Workspace configuration
└── README.md

## Tech Stack

### Frontend
- React
- JavaScript
- Axios
- React Router
- TanStack Query
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- JWT / Session-based authentication
- Stripe API

---

## Installation

### Clone Repository
```bash
git clone https://github.com/Ostap200488/POS-4.git
cd POS-4

Backend Setup
cd pos-backend
npm install
Create a .env file:
PORT=8000
MONGO_URI=your_database_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
Run backend:
npm run dev
Frontend Setup
cd pos-frontend
npm install
npm run dev
Frontend will run on:
http://localhost:5173
Backend will run on:
http://localhost:8000
Stripe Testing
Use Stripe test keys and test cards:
Card Number: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
