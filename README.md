# 🎟️ Ticket Booking System
This is a fullstack ticket booking system that I developed as a personal project to practice and improve my skills in both backend and mobile development.
Users can register, log in, browse events, purchase tickets, and validate them using QR codes.

---

## 🎯 Features
- 🔐 User Authentication
- 🎉 Event Management (CRUD)
- 🎫 Ticket System(Users can browse events, purchase tickets, and receive a QR code for validation)
- 🧾 Middleware Access Control
- 📱 Mobile App(Built with Expo, providing a native-like experience)
- 🐳 Dockerized Services

---

## 🛠 Tech Stack

### Frontend
- React Native (with Expo)
- TypeScript
- React Navigation
- Axios
- QR Code Scanner (Expo Camera + BarCodeScanner)

### Backend
- Go + Fiber
- PostgreSQL + GORM
- JWT + bcrypt

### Dev Tools
- Docker
- pgAdmin
- Ngrok
- Makefile

## 🧪 Quick Start

### 🚀 Backend (API Server)
```bash
# Start the backend serve
make start
```

---

### 📱 Frontend (React Native App)
```bash
# Launch the mobile app
npx expo start --tunnel
```

---

## 🌐 Ngrok for Local API Tunneling

### 1. Install ngrok globally

```bash
npm install -g ngrok
```

### 2️. Start tunneling your local backend

```bash
ngrok http 3000
```

You'll get an HTTPS URL like

```bash
https://683c-2405-9800-b870-3e32-8b7-720f-e240-d630.ngrok-free.app
```

### 3️. Update your React Native API URL (in `mobile/services/api.ts`)
```bash
const url = "https://YOUR_NGROK_URL.ngrok-free.app";
```

---

## 🗃️ pgAdmin Access

### 1️. Open your browser and navigate to
```bash
http://localhost:8080
```

### 2️. Use the following credentials to log in
- Email: `admin@ticket.dev`
- Password: `admin123`

---

## 📚 Learned From / Inspired By

This project was built based on knowledge and inspiration from the following resource:

- [https://www.youtube.com/@vaillantt](https://www.youtube.com/@vaillantt)

Special thanks to the original author for providing such a clear and well-structured example. It served as a great learning foundation for this project.
