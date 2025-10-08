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

git clone <your-repo-url>
cd booking-api
2. Install Dependencies

npm install
# or
yarn install
3. Database Setup
Create a PostgreSQL database named booking_api:


CREATE DATABASE booking_api;
4. Environment Configuration
Create a .env.stage.dev file in the project root:

env
# Database Configuration
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

# Development mode
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


{
  "email": "user@example.com",
  "password": "123456",
  "role": "user"
}
Login
POST /auth/login

Description: Authenticate user and receive JWT token

Request Body:


{
  "email": "user@example.com",
  "password": "123456"
}
Response:


{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
Event Endpoints
Method	Endpoint	Description	Access
GET	/api/events	List all events	Public
GET	/api/events/:id	Get event by ID	Public
POST	/api/events	Create new event	Admin only
PATCH	/api/events/:id	Update event	Admin only
DELETE	/api/events/:id	Delete event	Admin only
GET	/api/events/:id/availability	Check seat availability	Public
Create Event Example (Admin):


{
  "name": "Summer Concert",
  "totalSeats": 100
}
Booking Endpoints
Reserve Booking
POST /api/bookings/reserve

Description: Reserve seats for an event

Authentication: Required (JWT)

Request Body:


{
  "eventId": "uuid-here"
}
Cancel Booking
PATCH /api/bookings/:id/cancel

Description: Cancel an existing booking

Authentication: Required (JWT)

🔐 Authentication Header
All protected endpoints require JWT authentication:

text
Authorization: Bearer <your-jwt-token>
🗃️ Database Schema
User Entity
typescript
{
  id: UUID (Primary Key),
  email: string (Unique),
  password: string (Hashed),
  role: 'admin' | 'user',
  bookings: Booking[] (OneToMany)
}
Event Entity
typescript
{
  id: UUID (Primary Key),
  name: string,
  totalSeats: number,
  bookings: Booking[] (OneToMany),
  deletedAt: Date (Soft Delete)
}
Booking Entity
typescript
{
  id: UUID (Primary Key),
  userId: UUID (Foreign Key),
  eventId: UUID (Foreign Key),
  isCanceled: boolean,
  createdAt: Date
}
🧪 Testing the API
Using cURL
Register a User

curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456",
    "role": "user"
  }'
Login and Get Token

curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456"
  }'
Reserve a Booking

curl -X POST http://localhost:3000/api/bookings/reserve \
  -H "Authorization: Bearer <your-jwt-token>" \
  -H "Content-Type: application/json" \
  -d '{"eventId": "<event-uuid>"}'
Check Event Availability

curl http://localhost:3000/api/events/<event-id>/availability
Using Postman/Insomnia
Import the provided API collection

Set up environment variables for base URL and tokens

Test endpoints sequentially (register → login → use token for protected endpoints)

📁 Project Structure
text
booking-api/
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
🔧 Development
Running in Development Mode

npm run start:dev
Building the Project

npm run build
Running Tests

npm test
Database Migrations

# Generate migration
npm run typeorm migration:generate -- -n MigrationName

# Run migrations
npm run typeorm migration:run
⚠️ Important Notes
Admin Access
To test admin features, register a user with "role": "admin" in the registration payload.

JWT Configuration
Ensure the JWT secret in your environment variables matches the one used in JwtStrategy.

Soft Delete Behavior
Soft-deleted events remain in the database but cannot be booked

Historical booking data is preserved for analytics

Events can be permanently deleted from the database if needed

Security Considerations
Passwords are hashed using bcrypt

JWT tokens have expiration times

Input validation prevents SQL injection and XSS attacks

CORS is configured for production environments

🐛 Troubleshooting
Common Issues
Database Connection Error

Verify PostgreSQL is running

Check database credentials in .env.stage.dev

Ensure database booking_api exists

JWT Authentication Failures

Verify JWT secret is set in environment variables

Check token expiration

Ensure Authorization header is properly formatted

Port Already in Use

Change PORT in .env.stage.dev

Or kill process using port 3000: npx kill-port 3000

🤝 Contributing
Fork the repository

Create a feature branch

Commit your changes

Push to the branch

Create a Pull Request

📄 License
This project is licensed under the MIT License.

🆘 Support
For support and questions:

Create an issue in the repository

Check existing documentation

Review API examples in the /examples directory

Happy Coding! 🎉

Key Improvements Made:
Fixed all markdown formatting - Proper headings, code blocks, and structure

Organized sections logically - Clear flow from setup to usage

Fixed the broken table - Proper markdown table formatting for endpoints

Improved readability - Consistent spacing and section hierarchy

Enhanced visual appeal - Using emojis and proper formatting for better scanning

Complete documentation - All necessary information is properly structured and easy to find

The README now follows professional documentation standards and provides a comprehensive guide for developers.

give me the readme file that i can download
