# HRMS Lite

A lightweight Human Resource Management System built using:

- React (Frontend)
- FastAPI (Backend)
- SQLite (Database)

## Features

- Add / Delete Employees
- Mark Attendance
- View Attendance Records per Employee
- RESTful API
- Clean Professional UI

## How to Run Locally

### Backend
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

### Frontend
cd frontend
npm install
npm run dev

Backend: http://127.0.0.1:8000
Frontend: http://localhost:5173