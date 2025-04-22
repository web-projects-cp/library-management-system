# Fullstack-Typescript-Project

First choose the project topic. The topics and assignment can be found in Fullstack assignment presentation on the shared drive.

## Prerequisites

1. Install mongodb or use MongoDB Atlas (cloud version)
2. Install nodejs (if you don't have it already)

## Setting Up for `API folder`

1. Create a `.env` file in the root directory and copy the content from `.env.example`

2. Make sure mongodb is running (if you are using local MongoDB)
3. Install dependencies: `yarn`
4. Use this command for development mode: `yarn run start:dev`
5. If you need to customize your env, take a look at `secrets.ts` file

## Requirements

Below are the steps that you need to finish in order to finish this module

1. Explore the code base of the api folder, start with `server.ts` and `app.ts`
2. Client folder is for the react frontend. Start with `api` first before moving on to `client`
3. Create all the mongoose schema for your ERD
4. Create CRUD endpoints for all the schema
5. Separate the routers and controller, controller goes into the controller folders. Controllers only handles request and response, and will call service to process business logics.
6. Create more controller for your app if needed. Eg: borrow books, add product to order
7. For business logic like saving data to database, filtering, searching or updating, these are services and goes into services folder
8. Add authentication middleware using passport, google and jwt strategy
9. Add tests for your controllers and services. Remember to create the jwt token for your tests, because if your controller is protected, then the test should send the token also


---

## Solution

A full-stack application for managing library operations with React frontend and Node.js/Express backend.

![Library Management System Screenshot](https://github.com/web-projects-cp/library-management-system/blob/main/screenshot.png)

## Features

### Frontend (React)
- User authentication (Login/Register)
- Book management (Add/View/Update)
- Author management
- Admin dashboard
- Responsive design

### Backend (Node.js/Express)
- RESTful API endpoints
- JWT authentication
- Database operations for books/authors/users
- Error handling and logging
- API documentation

## Tech Stack

**Frontend:**
- React.js
- TypeScript
- CSS Modules
- Axios for API calls

**Backend:**
- Node.js
- Express.js
- TypeScript
- MongoDB (or your database)
- Passport.js (for authentication)

## Project Structure

```
fs10-fullstack-project-feature-backend/
├── api/                   # Backend server
│   ├── src/               # Source code
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Database models
│   │   ├── routers/       # API routes
│   │   └── server.ts      # Server entry point
│   └── test/             # Test files
└── client/                # Frontend application
    ├── public/            # Static files
    └── src/               # React components
        ├── components/    # Reusable components
        ├── pages/         # Page components
        └── utils/         # Utility functions
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (or your preferred database)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/library-management-system.git
   cd fs10-fullstack-project-feature-backend
   ```

2. **Install backend dependencies**
   ```bash
   cd api
   npm install
   # or
   yarn install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   # or
   yarn install
   ```

### Configuration

1. **Backend Environment Setup**
   - Create `.env` file in `api/` directory:
     ```env
     PORT=5050
     MONGODB_URI=mongodb://localhost:27017/library_db
     JWT_SECRET=your_jwt_secret
     ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd api
   npm start
   # or
   yarn start
   ```
   Server will run on `http://localhost:5050`

2. **Start the frontend application**
   ```bash
   cd ../client
   npm start
   # or
   yarn start
   ```
   Client will run on `http://localhost:3000`

## API Endpoints

| Method | Endpoint        | Description                |
|--------|----------------|---------------------------|
| POST   | /api/users     | Register new user          |
| POST   | /api/users/login | User login               |
| GET    | /api/books     | Get all books             |
| POST   | /api/books     | Add new book              |
| PUT    | /api/books/:id | Update book               |
| DELETE | /api/books/:id | Delete book               |
| GET    | /api/authors   | Get all authors           |

## Available Scripts

### Backend (in `api/` directory)
- `start`: Starts the production server
- `dev`: Starts the development server with nodemon
- `test`: Runs tests

### Frontend (in `client/` directory)
- `start`: Starts the development server
- `build`: Builds the app for production
- `test`: Launches the test runner

