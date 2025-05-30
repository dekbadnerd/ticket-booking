# 🎟️ Ticket Booking System

## 📖 Project Description
A fullstack ticket booking system that allows users to register, log in, manage events, and purchase tickets with QR code validation.  
The backend is built using Go (Fiber framework), and the frontend is a mobile app developed with React Native (TypeScript).  
The system features JWT authentication, PostgreSQL database integration, and Docker support for deployment.

## 🎯 Main Features
- User authentication (Register/Login) with JWT
- Event management (Create, Read, Update, Delete)
- Ticket management (Buy, View, Validate with QR Code)
- Middleware for route protection
- Auto-migration for database tables
- Mobile application built with React Native (Expo)
- Dockerized backend and database

## 🚀 How to Run the Project

### 🖥️ Backend (API Server)
Run the backend using the Makefile:
```bash
make start
```

### 📱 Frontend (Mobile App)
Run the mobile app using Expo:
```bash
npx expo start --tunnel
```

## 🚀  How to Access pgAdmin

### 1️⃣ Open your browser and navigate to
```bash
http://localhost:8080
```

### 2️⃣ Use the following credentials to log in
- Email: admin@ticket.dev
- Password: admin123
