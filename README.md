# Web Diary Application

A full-stack web application that allows users to maintain personal diaries, with user authentication via Google OAuth and local login. The backend is built with Express, Node.js, and MongoDB, while the frontend uses React and PrimeReact for a smooth user experience.

## Features

- User authentication using Google OAuth and local login.
- Secure password storage using `bcryptjs`.
- Diary entries stored securely in MongoDB.
- File uploads with `multer`.
- Responsive UI with PrimeReact components.
- Rate limiting to prevent abuse.

## Tech Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Frontend**: React, PrimeReact, Bootstrap Icons
- **Authentication**: Passport.js (Google OAuth and Local Strategy)
- **File Uploads**: Multer
- **Environment Variables**: dotenv
- **Sessions**: express-session
- **Security**: bcryptjs, express-rate-limit, jsonwebtoken
- **Development Tools**: TypeScript, Nodemon, Concurrently

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/web-diary.git
    ```
2. Navigate into the project directory:
    ```bash
    cd web-diary
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Create a `.env` file in the root of the project and add the following variables:
    ```bash
    PORT=5000
    MONGODB_URI=<Your MongoDB URI>
    JWT_SECRET=<Your JWT Secret>
    GOOGLE_CLIENT_ID=<Your Google Client ID>
    GOOGLE_CLIENT_SECRET=<Your Google Client Secret>
    ```

5. Install client-side dependencies:
    ```bash
    cd client && npm install
    ```

## Running the Application

1. To run the backend server:
    ```bash
    npm run start
    ```

2. To start the development mode (concurrently running backend and frontend):
    ```bash
    npm run start:dev
    ```

3. The backend will be running on `http://localhost:5000` and the frontend on `http://localhost:3000`.

## Project Structure

- **/src**: Contains backend server code (Express.js)
- **/client**: React frontend code
- **/models**: Mongoose models for database schema
- **/routes**: Express routes for API endpoints
- **/middleware**: Custom middleware for authentication and rate limiting
- **/public**: Static assets (e.g., images, stylesheets)

## Scripts

- `npm run start`: Start the backend server with Nodemon.
- `npm run start:client`: Start the React development server.
- `npm run start:dev`: Start both backend and frontend concurrently for development.

## Dependencies

### Backend Dependencies

- `express`: Web framework for Node.js.
- `mongodb` & `mongoose`: MongoDB database and object modeling.
- `jsonwebtoken`: For creating and verifying JSON Web Tokens.
- `passport`, `passport-local`, `passport-google-oauth20`: For handling user authentication.
- `bcryptjs`: For hashing passwords securely.
- `express-session`: For handling user sessions.
- `multer`: For handling file uploads.
- `dotenv`: For loading environment variables.

### Frontend Dependencies

- `primereact`: A UI component library for React.
- `react-spinners`: Loading spinners for React components.
- `bootstrap-icons`: Icons for UI components.

### Dev Dependencies

- `nodemon`: Automatically restarts the server on code changes.
- `concurrently`: Allows running backend and frontend servers simultaneously.
- `typescript`: Static typing for better development experience.
- `ts-node`: For running TypeScript files directly.

## License

This project is licensed under the ISC License.

## Author

Created by [Aditya Hansraj](https://github.com/your-username).
