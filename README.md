# Role-Based Authentication and Course Management System

This project implements a full-stack web application featuring secure user authentication, admin approval, and a dynamic course management interface. It is divided into two major parts: a Next.js frontend and a Node.js + Express backend, with MongoDB for persistent data storage.

---

## Folder Structure

### `client/` (Frontend - Next.js)

* **Framework**: Built using Next.js (React-based).

* **Purpose**: Handles the UI for user registration, login, dashboard view, course management, and Super Admin actions.

* **Routing**:

  * `/register`: New user registration
  * `/login`: User login
  * `/dashboard`: Displays all available courses
  * `/dashboard/[courseId]`: Displays detailed view of a selected course, including modules and lessons
  * `/admin-panel`: Admin-only route to add and manage courses
  * `/super-admin/requests`: Super Admin-only page to view and approve/reject pending admin requests

* **API Communication**: Uses Axios to call backend APIs such as register, login, request admin, fetch courses, approve/reject admin users, etc.

* **Role-Based Navigation**: Navbar dynamically shows links like “Admin Controls” and “Pending Requests” based on the logged-in user's role (`user`, `admin`, `superAdmin`).

---

### `server/` (Backend - Node.js + Express)

* **controllers/**

  * `authController`: Handles user registration, login, logout, and sends admin access requests if requested at registration.
  * `userController`: Adds support for dashboard access and requesting admin access after registration.
  * `superAdminController`: Handles viewing all pending admin access requests and approving or rejecting them.
  * `courseController`: Contains logic for creating and retrieving courses and their modules.

* **routes/**

  * `authRoutes`: Contains routes for registration, login, logout, and token validation.
  * `userRoutes`: Authenticated routes for dashboard view and sending admin access request post-registration.
  * `adminRoutes`: Protected endpoints for course management available to both `admin` and `superAdmin`.
  * `superAdminRoutes`: Routes to view, approve, or reject admin access requests (only for `superAdmin` users).
  * `courseRoutes`: Defines endpoints for creating, retrieving, and viewing individual course data.

* **models/**

  * `User`: Mongoose schema for storing user credentials and roles (`user`, `admin`, `superAdmin`) along with `adminRequestStatus` field (pending, rejected, none).
  * `Course`: Mongoose schema for storing course details including modules, subtopics, and lessons.

* **utils/**

  * `token`: Functions for generating JWTs and setting secure cookies.
  * `mailer`: Configures Nodemailer for sending emails using Gmail.
  * `sendAdminRequestMail`: Sends an approval request to the Super Admin when a user requests admin access.

* **.env**

  * Stores sensitive environment variables:

    * Gmail credentials for sending emails
    * MongoDB URI
    * JWT secret
    * Client origin
    * Super Admin email address

* **server.js**

  * Main entry point for the backend server. Sets up Express middleware, connects to MongoDB, and mounts all API routes.

---

## How the Client Connects to the Server

The frontend (Next.js) communicates with the backend via RESTful APIs. All protected routes use JWT authentication stored in HTTP-only cookies. When users log in, a token is issued and automatically included in future requests.

### Sample Workflow:

1. A user registers and optionally selects **"Request Admin"** from a dropdown.
2. The backend creates a user with role `"user"` and status `"pending"` for admin access (if requested).
3. An email is sent to the Super Admin.
4. Super Admin logs in and visits `/super-admin/requests` to approve or reject pending admin requests.
5. Once approved, the user's role is upgraded to `admin`. If rejected, the status is set to `"rejected"` and they are excluded from future requests.
6. Admin users can now access `/admin-panel` to manage courses.

---

## Features

* Role-based authentication system (`user`, `admin`, `superAdmin`)
* Admin approval request at registration or post-registration
* Super Admin-only control panel to approve/reject admin requests
* JWT authentication with secure cookies
* Dynamic course creation with modules, lessons, and subtopics
* Nested course structure view with module-level expansion
* Email handling using Nodemailer and Gmail App Password
* Responsive UI built with TailwindCSS
* Secure and scalable code structure following best practices

---

## Setup Instructions

1. Install all dependencies in both the `client` and `server` directories.
2. Set up your `.env` file in the `server/` folder with MongoDB URI, Gmail credentials, JWT secret, and Super Admin email.
3. Start the backend server to enable MongoDB connection and APIs.
4. Start the frontend client to serve the React-based UI.
5. Use Postman or browser to test registration, login, course management, and Super Admin approval flows.

---

## Technologies Used

* **Frontend**: Next.js, React, TailwindCSS, Axios
* **Backend**: Node.js, Express.js, MongoDB, Mongoose
* **Authentication**: JWT (JSON Web Tokens), Cookies
* **Email System**: Nodemailer with Gmail App Password
* **Development Tools**: Postman, Turbopack, Vercel (optional for deployment)
