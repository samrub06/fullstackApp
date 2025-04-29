# Fullstack Application

A modern fullstack application built with React, Node.js, and MongoDB.

## Tech Stack

### Frontend
- React with TypeScript
- Redux for state management
- React Query for data fetching
- CSS for styling

### Backend
- Node.js with Express
- MongoDB for database
- TypeScript for type safety

## Pages

1. **Home Page**
   - Displays a list of users
   - Features a button to load/refresh user data
   - Shows loading states and error handling

## Development Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Environment Variables
Create a `.env` file in the server directory with the following variables:
```
MONGODB_URI=mongodb+srv://test:test@cluster0.mcjzncm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=3001
```

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

### Running the Application
1. Start the server:
   ```bash
   cd server
   npm run dev
   ```

2. Start the client:
   ```bash
   cd client
   npm start
   ```

The application will be available at `http://localhost:3000`

## Features
- User management
- Real-time data updates
- Error handling
- Loading states
- Responsive design

## Note
This application is currently in development and not production-ready. The MongoDB connection is configured for development environment only.
