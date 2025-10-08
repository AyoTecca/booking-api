# Booking API

Backend API for event booking with seat limits, authentication, and admin management.

## 🚀 Tech Stack

- Node.js & NestJS
- TypeScript  
- PostgreSQL
- TypeORM
- JWT Authentication

## ✨ Features

- User authentication (register/login)
- Role-based access (admin/user)
- Event management
- Booking with seat availability
- Soft delete for events
- Input validation

## 📋 Prerequisites

- Node.js v18+
- npm or yarn
- PostgreSQL

## 🛠️ Quick Start

# Clone and install
git clone <repo-url>
cd booking-api
npm install

# Setup database
createdb booking_api

# Environment (create .env.stage.dev)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_DATABASE=booking_api
JWT_SECRET=your_jwt_secret
STAGE=dev
PORT=3000

# Run
npm run start:dev

## 🔌 Key Endpoints

### Authentication

# Register
POST /auth/register
{"email": "user@example.com", "password": "123456", "role": "user"}

# Login  
POST /auth/login
{"email": "user@example.com", "password": "123456"}

## Events

- `GET /api/events` - List events
- `POST /api/events` - Create event (admin)
- `GET /api/events/:id/availability` - Check seats

## Bookings

- `POST /api/bookings/reserve` - Reserve seats
- `PATCH /api/bookings/:id/cancel` - Cancel booking

**Auth Header:** `Authorization: Bearer <token>`

## Database Schema

**User**
- id, email, password, role, bookings[]

**Event**
- id, name, totalSeats, bookings[], deletedAt

**Booking**
- id, userId, eventId, isCanceled, createdAt

## 🧪 Testing

Use the following cURL commands to test the API endpoints:

**Register a new user**
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456","role":"user"}'

**User login**
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'

Reserve a booking (Replace <token> and <event-id> with actual values)

curl -X POST http://localhost:3000/api/bookings/reserve \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"eventId":"<event-id>"}'

## ⚠️ Important Notes

**To access admin features, register a user with "role": "admin"**

**Ensure the JWT_SECRET in your environment configuration file matches the one used in your application's JwtStrategy**

**Events are soft-deleted; they remain in the database for historical record-keeping but become unavailable for new bookings**

The API will be available at: http://localhost:3000
