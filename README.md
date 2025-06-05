# PocketLink - An URL Shortner

This project is made basically to cut short the long URL's. 
Whenever you copy the link of any image it's so big that it become a hectic task to manage that and if by mistake any letter got missed then the URL become useless.
So for that purpose , I made this simple URL shortner for working with long URL's. 
The name of the website itself shows that now you can keep the URL's in your pocket as they will be of pocket size. 

## Description

The project mainly deals with frontend and backend integration to the MongoDB. A user can shorten the URL and then access it anytime he want's to . There is a counter 
that keep's track of the number of clicks on the shortened URL. And the user can also give custom names to the URL. 

There are two ways by which a user can use this website:
1. By signing up
2. without signing up

The user who hasn't signed up to the website will not be getting additional features like customized URL and click counter on the URL .

## Technologies Used

This project leverages the following technologies:

**Frontend (React.js):**
-   [React]
-   [React Router DOM]
-   [Axios] : for API requests
-   [Tailwind CSS] : for styling
-   [Vite] : as a build tool

**Backend (Node.js & Express.js):**
-   [Node.js] : Runtime environment
-   [Express.js] : Web framework
-   [Bcrypt.js] : for password hashing
-   [JSON Web Token (JWT)] : for user authentication
-   [Mongoose] : MongoDB object modeling for Node.js
-   [CORS] : for handling Cross-Origin Resource Sharing
-   [Dotenv] : for environment variables
-   [Nodemon] : for automatic server restarts during development

**Database:**
-   [MongoDB] : NoSQL database

## Installation

Follow these steps to set up SwiftLink on your local machine.

### Prerequisites

Before you start, ensure you have these installed:

-   [Node.js](https://nodejs.org/en/download/) (LTS version recommended)
-   [MongoDB](https://www.mongodb.com/try/download/community) (Community Server or access to a MongoDB Atlas cluster)
-   [Git](https://git-scm.com/downloads)

### Backend Setup

1.  **Clone the repository:**
    ```
    git clone [https://github.com/parulawasthi04/PocketLink](https://github.com/parulawasthi04/PocketLink)
    cd e-commerce-product-catalog
    ```

2.  **Navigate to the `backend` directory:**
    ```
    cd backend
    ```

3.  **Install backend dependencies:**
    ```
    npm install
    
    ```

4.  **Create a `.env` file:**
    In the `backend` directory, create a file named `.env` and add your MongoDB connection string:
    ```
    MONGO_URI="mongodb://localhost:27017/URL_shortner"
    PORT=5000
    ```
    *Replace `"mongodb://localhost:27017/URL_Shortner"` with your actual MongoDB connection string (e.g., from MongoDB Atlas).*

5.  **Start the backend server:**
    ```
    npm run dev
    
    ```
    The backend server will typically run on `http://localhost:5000`.

### Frontend Setup

1.  **Navigate to the `frontend` directory:**
    ```
    cd ../frontend
    ```

2.  **Install frontend dependencies:**
    ```
    npm install
    
    ```

3.  **Create a `.env` file:**
    In the `frontend` directory, create a file named `.env` and define your backend API URL:
    ```
    VITE_API_BASE_URL=http://localhost:5000/api
    ```

4.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```
    The frontend application will typically open in your browser at `http://localhost:5173` (or another available port).

## Folder Structure

```
URL-Shortner/
├── backend/
│   ├── src/  
|   │   ├── config/         # Database connection 
|   │   ├── controllers/    # Logic for handling routes 
│   │   ├── DAO/            # separate the data persistence logic from the business logic of your application
│   |   ├── middleware/     # Authentication middleware
│   |   ├── models/         # Mongoose schemas 
│   |   ├── routes/         # API routes 
│   |   ├── services        # To encapsulate and organize the application's core business logic  
|   |   ├── utils           # Provides a home for generic, non-domain-specific helper functions 
│   ├──.env.example         # Example environment variables for backend
|   ├── app.js              # The main entry point of the Express application. It initializes the server, connects to the database, sets up middleware, and mounts API routes.
├── frontend/
|   ├──  src
|   |    ├── api/           # Centralizes functions for making API requests to the backend
|   |    ├── components/    # Reusable UI components (e.g., buttons, cards, forms)
|   |    ├── pages/         # Top-level components representing different views/screens (e.g., Home, Dashboard, Auth)
|   |    ├── routing/       # Defines the application's navigation paths and protected routes
|   |    ├── store/         # Manages global application state (e.g., using Redux, Zustand, or Context API)
|   |    ├── utils/         # Frontend-specific utility functions and helpers
|   ├── main.jsx            # The entry point for the React application, rendering the root component
|   ├── RootLayout.jsx      # Defines the common layout structure for the entire application (e.g., header, footer)
|   ├── index.css           # Global CSS styles and Tailwind CSS directives
|   ├── index.html          # The main HTML file that serves as the entry point for the web browser 
```

## Acknowledgements

-   Inspired by popular URL shortening services like Bitly and TinyURL.

For any questions, feedback, or collaboration inquiries, feel free to reach out:

-   **Email:**  04parulawasthi@gmail.com
-   **LinkedIn:** https://www.linkedin.com/in/parul-awasthi-a6b583243/
