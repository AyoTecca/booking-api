# Booking API

A backend API for event booking with seat limits, user authentication, and admin-controlled event management. Users can register, login, browse events, reserve seats, and cancel bookings, while admins can manage events and view booking availability.

---

## Tech Stack

- Node.js & NestJS
- TypeScript
- PostgreSQL
- TypeORM
- JWT Authentication
- `class-validator` for input validation

---

## Features

- **User Authentication**: Register and login with email and password.
- **Role-Based Access Control**: Admin and user roles with restricted access to certain endpoints.
- **Event Management**: Admins can create, update, delete, and list events.
- **Booking Management**: Users can reserve and cancel bookings with seat availability checks.
- **Soft Delete**: Deleted events are soft-deleted, preserving historical data.
- **Data Validation & Error Handling**: Ensures proper request inputs and handles edge cases like duplicate bookings or full events.

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- PostgreSQL installed locally

### Installation

1. Clone the repository:

```bash
git clone <repo-url>
cd booking-api
````

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up PostgreSQL:

* Create a database, e.g., `booking_api`.
* Ensure you have a user with privileges to access this database.

4. Create a `.env.stage.dev` file in the project root with the following content:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_DATABASE=booking_api
JWT_SECRET=your_jwt_secret
STAGE=dev
PORT=3000
```

5. Run the application:

```bash
npm run start:dev
# or
yarn start:dev
```

The API will be available at [http://localhost:3000](http://localhost:3000).

---

## API Endpoints

### Authentication

**Register**: `POST /auth/register`

Request body:

```json
{
  "email": "user@example.com",
  "password": "123456",
  "role": "user"
}
```

**Login**: `POST /auth/login`

Request body:

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

Response:

```json
{
  "access_token": "<JWT>"
}
```

---

### Events

* **List Events**: `GET /api/events`
* **Get Event by ID**: `GET /api/events/:id`
* **Create Event**: `POST /api/events` (admin only)

Request body:

```json
{
  "name": "Concert",
  "totalSeats": 100
}
```

* **Update Event**: `PATCH /api/events/:id` (admin only)
* **Delete Event**: `DELETE /api/events/:id` (admin only)
* **Check Availability**: `GET /api/events/:id/availability`

---

### Bookings

* **Reserve Booking**: `POST /api/bookings/reserve`

Request body:

```json
{
  "eventId": "<event-id>"
}
```

User ID is automatically taken from the JWT token.

* **Cancel Booking**: `PATCH /api/bookings/:id/cancel`

---

### Authentication Header

All protected endpoints require the following header:

```
Authorization: Bearer <JWT>
```

---

## Database

PostgreSQL is used with TypeORM.

### Entities

**User**

* `id`: UUID
* `email`: unique string
* `password`: hashed string
* `role`: 'admin' | 'user'
* `bookings`: OneToMany relation to bookings

**Event**

* `id`: UUID
* `name`: string
* `totalSeats`: integer
* `bookings`: OneToMany relation to bookings
* `deletedAt`: soft-delete timestamp

**Booking**

* `id`: UUID
* `userId`: UUID
* `eventId`: UUID
* `isCanceled`: boolean
* `createdAt`: timestamp

---

## Testing

Use Postman, Insomnia, or curl to test the API.

Example: Reserve a booking

```bash
curl -X POST http://localhost:3000/api/bookings/reserve \
-H "Authorization: Bearer <JWT>" \
-H "Content-Type: application/json" \
-d '{"eventId":"<event-id>"}'
```

Example: Check event availability

```bash
curl http://localhost:3000/api/events/<event-id>/availability
```

---

## Notes

* To test admin features, register a user with `"role": "admin"`.
* JWT secret must match between `.env` and `JwtStrategy`.
* Soft-deleted events cannot be booked but historical data remains intact.

```

