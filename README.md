Setup Instructions

1. Clone the repository
git clone https://github.com/your-username/taskmate
cd taskmate

2. Install Dependencies
Backend:
cd backend
npm install

Frontend:
cd ../frontend
npm install

3. Set up Environment Variables
Create a .env file in backend folder:
DATABASE_URL=your_postgresql_connection_string
PORT=4000

4. Run the App Locally
Backend:
node --watch server.js

Frontend:
cd ../frontend
npm start

Your app should now run on:
Frontend: http://localhost:3000
Backend: http://localhost:4000

Reflection Write-Up
Building TaskMate helped me understand the full process of building a complete web application—from frontend UI all the way to backend APIs and database connections. I learned how different layers of a web app communicate with each other and how important it is to keep things organized during development.
While not everything worked perfectly, this project helped me identify my strengths and the areas I need to work on next.

Design Choices
Frontend Framework: React
I chose React because:
It allows fast and dynamic UI updates using components.
It is easy to manage state (tasks, quotes).
It's the most commonly used modern frontend framework.

Backend: Node.js + Express
I chose Express because:
It is lightweight and easy to set up.
Routing is simple and clear.
It works naturally with JavaScript, so the entire app uses one language.

Database Schema: PostgreSQL
I used PostgreSQL because:
It is reliable for structured data.
Simple to integrate with Node using pg.
I only needed one table (tasks) with fields like:
id
title
completed
created_at

Challenges
1. Authentication
I struggled with understanding:
How the frontend sends login data to the backend.
How authentication is supposed to work with cookies, sessions, or JWT.
How protected routes interact between frontend → backend.
Because I didn’t fully understand the logic flow, I wasn’t able to complete authentication.

2. Deployment
Deployment was very challenging.
My frontend deployed successfully,
But the backend didn’t connect to it.
The app loaded, but none of the features worked because the API wasn’t communicating.
I realized I need to understand:
How to set environment variables in production,
How to set correct backend URLs,
How to deploy frontend + backend together properly.
Even though I couldn’t fix the deployment fully, it showed me exactly where I need to improve.
   
earning Outcomes
Through TaskMate, I learned:
How React components communicate and update the UI.
How to build a backend with Node.js + Express.
How to create routes for GET, POST, PUT, DELETE.
How to connect to a PostgreSQL database and run CRUD operations.
How to integrate a third-party API using axios.
How to structure code across frontend and backend.
How debugging and testing API routes works using browser and console logs.
I also learned that authentication and deployment require deeper learning and practice.

Future Work (Improvements)
With more time, I plan to:
Complete user authentication (login, signup, protected routes).
Fix and finalize deployment so both frontend and backend communicate.
Improve UI styling for a smoother experience.
Add categories, deadlines, and filters for tasks.
Allow users to save their favorite motivational quotes.
