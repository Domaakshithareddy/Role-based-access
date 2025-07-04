# Role-Based Authentication and Course Management System

This project implements a full-stack web application featuring secure user authentication, admin approval, and a dynamic course management interface. It is divided into two major parts: a Next.js frontend and a Node.js + Express backend, with MongoDB for persistent data storage.

---

## Folder Structure

### `client/` (Frontend - Next.js)

* **Framework**: Built using Next.js (React-based).
* **Purpose**: Handles the UI for user registration, login, dashboard view, and course management.
* **Routing**:

  * `/register`: New user registration
  * `/login`: User login
  * `/dashboard`: Displays all available courses
  * `/dashboard/[courseId]`: Displays detailed view of a selected course, including modules and lessons
  * `/admin-panel`: Admin-only route to add and manage courses
* **API Communication**: Uses Axios to call backend APIs such as register, login, fetch courses, and post new courses.

### `server/` (Backend - Node.js + Express)

* **controllers/**

  * `authController`: Handles user registration, login, logout, and sending admin request emails.
  * `courseController`: Contains logic for creating and retrieving courses and their modules.

* **routes/**

  * `authRoutes`: Contains routes for registration, login, and admin requests.
  * `courseRoutes`: Defines endpoints for creating, retrieving, and viewing individual course data.

* **models/**

  * `User`: Mongoose schema for storing user credentials and roles (user/admin).
  * `Course`: Mongoose schema for storing course details including modules, subtopics, and lessons.

* **utils/**

  * `token`: Functions for generating JWTs and setting cookies.
  * `mailer`: Configures Nodemailer for sending emails using Gmail.
  * `sendAdminRequestMail`: Sends an approval request to the admin when a user requests admin access.

* **.env**

  * Stores sensitive environment variables:

    * Gmail credentials for sending emails
    * MongoDB URI
    * JWT secret
    * Client origin
    * Admin email address

* **server.js**

  * Main entry point for the backend server. Sets up Express middleware, connects to MongoDB, and mounts all API routes.

---

## How the Client Connects to the Server

The frontend (Next.js) communicates with the backend via RESTful APIs. All protected routes use JWT authentication stored in HTTP-only cookies. When users log in, a token is issued and automatically included in future requests.

### Sample Workflow:

1. A user fills out the registration form and submits it.
2. The frontend sends a POST request to the backend with the form data.
3. The backend registers the user and optionally sends a request to the admin for approval (if the user selects admin role).
4. On login, a JWT token is issued and stored in a secure cookie.
5. The user is redirected to the dashboard where they can browse available courses.
6. Clicking a course shows its modules, and clicking a module reveals the lessons.

---

## Features

* Role-based authentication system (admin and regular user)
* Admin approval request via email notification
* JWT authentication with secure cookies
* Dynamic course creation with modules, lessons, and subtopics
* Nested course structure view with module-level expansion
* Email handling using Nodemailer and Gmail App Password
* Responsive UI built with TailwindCSS
* Secure and scalable code structure following best practices

---

## Setup Instructions

1. Install all dependencies in both the client and server directories.
2. Set up your `.env` file in the server folder with MongoDB URI, Gmail credentials, and other secrets.
3. Start the backend server to enable API endpoints and MongoDB connection.
4. Start the frontend client to serve the React-based interface.
5. Use Postman or browser to test registration, login, and course management features.

---

## Technologies Used

* **Frontend**: Next.js, React, TailwindCSS, Axios
* **Backend**: Node.js, Express.js, MongoDB, Mongoose
* **Authentication**: JWT (JSON Web Tokens), Cookies
* **Email System**: Nodemailer with Gmail App Password
* **Development Tools**: Postman, Turbopack, Vercel (optional for deployment)
