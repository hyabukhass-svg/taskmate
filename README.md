# TaskMate

TaskMate is a full-stack task management application with a React frontend and an Express backend. Users can add, edit, delete, and filter tasks. The app also includes dark mode and motivational quotes.

---

## Features

- Add, edit, and delete tasks
- Mark tasks as completed or pending
- Filter tasks (All / Completed / Pending)
- Dark mode toggle
- Motivational quotes display
- Simple login/signup simulation (frontend only)

---

## Setup

1. **Clone the repository**
```bash
git clone https://github.com/hyabukhass-svg/taskmate.git
cd taskmate

##Setup backend

cd backend
npm install

##Setup frontend

cd ../frontend
npm install


#3Configure environment variables

Create a .env file in the backend folder with the following:

PORT=4000
DATABASE_URL='postgresql://neondb_owner:npg_BsQpuN91yrPd@ep-silent-snow-a889z78u-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require'
------
##Running the App

##Start backend

cd backend
node server.js

------
##Start frontend

cd frontend
npm start

------
##Open in browser

Visit: http://localhost:3000
