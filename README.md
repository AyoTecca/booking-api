Booking API
A backend API for event booking with seat limits, user authentication, and admin-controlled event management. This project allows users to register, login, browse events, reserve seats, and cancel bookings, while admins can manage events and view booking availability.
🚀 Tech Stack

Backend Framework: Node.js & NestJS
Language: TypeScript
Database: PostgreSQL
ORM: TypeORM
Authentication: JWT
Validation: class-validator

✨ Features

🔐 User Authentication: Secure register and login with email and password
👥 Role-Based Access Control: Admin and user roles with restricted access to endpoints
🎭 Event Management: Admins can create, update, delete, and list events
📅 Booking Management: Users can reserve and cancel bookings with seat availability checks
🗑️ Soft Delete: Deleted events are preserved for historical data
✅ Data Validation: Comprehensive input validation and error handling
🎫 Seat Management: Real-time seat availability tracking

📋 Prerequisites
Before running this application, ensure you have the following installed:

Node.js v18 or higher
npm or yarn
PostgreSQL (locally installed or cloud instance)

🛠️ Installation & Setup
1. Clone the Repository
bashgit clone <your-repo-url>
cd booking-api
2. Install Dependencies
bashnpm install
# or
yarn install
3. Database Setup
Create a PostgreSQL database named booking_api:
sqlCREATE DATABASE booking_api;
4. Environment Configuration
Create a .env.stage.dev file in the project root:
env# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_DATABASE=booking_api

# JWT Configuration
JWT_SECRET=your_secure_jwt_secret_here

# Application Configuration
STAGE=dev
PORT=3000
5. Run the Application
bash# Development mode
npm run start:dev

# Production build
npm run build
npm run start:prod
The API will be available at http://localhost:3000
🔌 API Endpoints
Authentication Endpoints
Register User

POST /auth/register
Description: Create a new user account

Request Body:
json{
  "email": "user@example.com",
  "password": "123456",
  "role": "user"
}
Login

POST /auth/login
Description: Authenticate user and receive JWT token

Request Body:
json{
  "email": "user@example.com",
  "password": "123456"
}
Response:
json{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
Event Endpoints















































MethodEndpointDescriptionAccessGET/api/eventsList all eventsPublicGET/api/events/:idGet event by IDPublicPOST/api/eventsCreate new eventAdmin onlyPATCH/api/events/:idUpdate eventAdmin onlyDELETE/api/events/:idDelete eventAdmin onlyGET/api/events/:id/availabilityCheck seat availabilityPublic
Create Event Example (Admin):
json{
  "name": "Summer Concert",
  "totalSeats": 100
}
Booking Endpoints
Reserve Booking

POST /api/bookings/reserve
Description: Reserve seats for an event
Authentication: Required (JWT)

Request Body:
json{
  "eventId": "uuid-here"
}
Cancel Booking

PATCH /api/bookings/:id/cancel
Description: Cancel an existing booking
Authentication: Required (JWT)

🔐 Authentication Header
All protected endpoints require JWT authentication:
textAuthorization: Bearer <your-jwt-token>
🗃️ Database Schema
User Entity
typescript{
  id: UUID (Primary Key),
  email: string (Unique),
  password: string (Hashed),
  role: 'admin' | 'user',
  bookings: Booking[] (OneToMany)
}
Event Entity
typescript{
  id: UUID (Primary Key),
  name: string,
  totalSeats: number,
  bookings: Booking[] (OneToMany),
  deletedAt: Date (Soft Delete)
}
Booking Entity
typescript{
  id: UUID (Primary Key),
  userId: UUID (Foreign Key),
  eventId: UUID (Foreign Key),
  isCanceled: boolean,
  createdAt: Date
}
🧪 Testing the API
Using cURL
Register a User
bashcurl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456",
    "role": "user"
  }'
Login and Get Token
bashcurl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456"
  }'
Reserve a Booking
bashcurl -X POST http://localhost:3000/api/bookings/reserve \
  -H "Authorization: Bearer <your-jwt-token>" \
  -H "Content-Type: application/json" \
  -d '{"eventId": "<event-uuid>"}'
Check Event Availability
bashcurl http://localhost:3000/api/events/<event-id>/availability
Using Postman/Insomnia

Import the provided API collection
Set up environment variables for base URL and tokens
Test endpoints sequentially (register → login → use token for protected endpoints)

📁 Project Structure
textbooking-api/
├── src/
│   ├── auth/
│   ├── events/
│   ├── bookings/
│   ├── users/
│   ├── common/
│   └── entities/
├── test/
├── package.json
├── tsconfig.json
└── README.md