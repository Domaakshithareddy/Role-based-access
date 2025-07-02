# Role based Authentication System

This project implements a full-stack authentication system with role-based access control, user registration, login, and email-based admin approval. The project is divided into two main parts: a **Next.js client** and a **Node.js + Express server** with MongoDB.

---

## Folder Structure

### `client/` (Frontend - Next.js)

- **Framework**: Next.js (React-based)
- **Purpose**: Handles user interface, registration form, login, and authentication-related routes.
- **API Communication**: Connects to the backend server using `fetch` or `axios` to call authentication and verification endpoints (e.g., `/api/register`, `/api/login`, etc.).

### `server/` (Backend - Node.js + Express)

- **controllers/**
  - Contains route handler logic such as `authController.js` for user registration, login, verification, and logout.

- **routes/**
  - Defines Express routes. For example, `authRoutes.js` maps API endpoints to the relevant controller functions.

- **models/**
  - Mongoose models for MongoDB collections. The `User.js` schema handles validation, hashing passwords, and comparison logic.

- **utils/**
  - Utility files including:
    - `token.js`: Handles JWT creation and cookie management.
    - `mailer.js`: Configures Nodemailer for sending emails using Gmail App Password.
    - `sendAdminRequestMail.js`: Sends email to admin when a user requests admin access.

- **.env**
  - Stores environment variables such as:
    - `EMAIL_USER`: Gmail address used to send emails.
    - `EMAIL_PASS`: Gmail App Password.
    - `ADMIN_EMAIL`: Email where admin access requests are sent.
    - `JWT_SECRET`, `CLIENT_URL`, etc.

- **server.js**
  - Entry point for the Express backend.
  - Sets up middleware, MongoDB connection, and routes.

---

## How Client Connects to Server

The **Next.js client** makes HTTP requests to the backend Express server using RESTful APIs. Endpoints such as `/api/register` and `/api/login` are exposed by the server and consumed by the frontend via `fetch` or `axios`.

Example flow:
1. A user fills out the registration form in the frontend.
2. The client sends a POST request to `/api/register`.
3. The server creates the user, hashes the password, and optionally sends an admin request email.
4. The client handles the server's JSON response to show appropriate messages or redirect.

---

## Features

- User registration and login with hashed password storage.
- Role-based access control (user/admin).
- Admin approval system: users requesting admin are saved as regular users, and an email is sent to the admin.
- Email delivery via Nodemailer using Gmail App Passwords.
- JWT authentication with secure cookie handling.
- Fully modular and scalable folder structure.

---

## Setup Instructions

1. Install dependencies in both `client/` and `server/` folders.
2. Set up environment variables in `.env` for the server.
3. Use a MongoDB instance (local or cloud).
4. Run both client and server with appropriate dev commands.

---

## Technologies Used

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Token)
- **Email**: Nodemailer with Gmail App Password