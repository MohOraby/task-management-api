# Task Management API

This is a Task Management API built with Node.js, Express, MongoDB, and TypeScript. It allows users to register, log in, and manage their tasks with features like prioritization, search, filtering, and pagination.

## Features

- User Authentication: Register and Login
- Task Management: Create, Read, Update, and Delete Tasks
- Task Search and Filter: Search tasks by title and filter by status and priority
- Pagination: Get tasks with pagination support

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 12 or later)
- [MongoDB](https://www.mongodb.com/) (running locally or on a remote server)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/MohOraby/task-management-api.git
cd task-management-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your_jwt_secret
```

### 4. Run the Development Server

```bash
npm run dev
```

### 5. Build the Project and Start it

```bash
npm run build
npm run start
```