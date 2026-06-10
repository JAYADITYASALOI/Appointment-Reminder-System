# WhatsApp Appointment Reminder System

A local full-stack web application that lets a user create appointments, store them in a MySQL database, show them in a live dashboard, and automatically trigger reminder logic when an appointment is within one hour.

This project is designed as a clean, simple appointment reminder workflow with a modern React frontend, a Node.js + Express backend, and MySQL as the data store. It uses a mock sender for messaging, which means the application clearly shows where a real WhatsApp or SMS integration would happen, while remaining fully free and fully runnable on a local machine.

## What this project does

- Provides a simple form to enter:
  - customer name
  - phone number
  - appointment time
- Saves each appointment into MySQL
- Simulates a confirmation message after an appointment is created
- Displays a live dashboard of all appointments
- Automatically checks for appointments that are within 1 hour
- Simulates a reminder message and marks that reminder as sent
- Prevents duplicate reminders from being sent

## Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** MySQL
- **Scheduler:** node-cron
- **Messaging:** Mock sender (console-based simulation)

## Key Features

- Clean, responsive user interface
- Live appointment list pulled from the database
- Backend API for creating and listing appointments
- Automatic reminder sweep every minute
- Confirmation and reminder logs stored in the database
- Simple, readable project structure
- Fully local and free to run

## System Requirements

Before running the project, make sure your system has the following:

- A Windows, macOS, or Linux computer
- At least 4 GB RAM
- Node.js installed
- MySQL Server installed and running
- MySQL Workbench or another MySQL client installed
- A web browser such as Chrome or Edge
- A code editor such as VS Code
- Git installed if you want to push the project to GitHub

## Pre-Installations Needed

Install these before opening or running the project:

1. **Node.js**
   - Required for both the frontend and backend
   - Used to run `npm install`, `npm run dev`, and the React/Vite and Express apps

2. **MySQL Server**
   - Required to store appointments and message logs

3. **MySQL Workbench**
   - Useful for creating the database and running `schema.sql`

4. **Git**
   - Useful for version control and GitHub upload

5. **VS Code or another code editor**
   - Needed to edit the project files

## Pre-Installations of Dependencies

After extracting the project, install the project dependencies inside each folder.

### Backend dependencies
Run this inside the `backend` folder:

```bash
npm install

This installs the required backend packages:

express
mysql2
cors
dotenv
node-cron
nodemon
Frontend dependencies

Run this inside the frontend folder:

npm install

This installs the required frontend packages:

react
react-dom
vite
@vitejs/plugin-react
Project Structure
whatsapp-appointment-reminder/
├─ frontend/
├─ backend/
└─ database/
Full Folder Overview
Frontend
frontend/src/App.jsx — main application layout
frontend/src/App.css — app styling
frontend/src/index.css — global styles
frontend/src/main.jsx — React entry point
frontend/src/components/ — form and dashboard UI components
frontend/src/api/appointments.js — frontend API calls
Backend
backend/src/server.js — starts the server
backend/src/app.js — Express app setup
backend/src/config/db.js — MySQL connection
backend/src/controllers/appointments.controller.js — request handling
backend/src/services/appointment.service.js — database operations
backend/src/services/message.service.js — mock message sender
backend/src/services/reminder.service.js — reminder sweep logic
backend/src/jobs/reminder.job.js — scheduled reminder job
backend/src/routes/appointments.routes.js — API routes
Database
database/schema.sql — database and table creation script
How to Run the Project

Follow these steps in order.

1) Download the ZIP file

Download the project ZIP file from the GitHub repository and extract it on your computer.

2) Open the extracted folder

After extraction, open the main project folder:

whatsapp-appointment-reminder/

Inside it, you should see:

frontend
backend
database
3) Create the MySQL database

Open MySQL Workbench and run the SQL file:

database/schema.sql

This creates:

the database
the appointments table
the message_logs table
4) Configure the backend environment file

Open:

backend/.env

Set your MySQL credentials correctly, for example:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=whatsapp_reminder_db
5) Configure the frontend environment file

Open:

frontend/.env

Make sure it contains:

VITE_API_BASE_URL=http://localhost:5000/api
6) Install backend dependencies

Open a terminal in the backend folder and run:

npm install
7) Start the backend server

Still inside the backend folder, run:

npm run dev

If everything is correct, the backend should start on port 5000.

8) Install frontend dependencies

Open a second terminal in the frontend folder and run:

npm install
9) Start the frontend app

Still inside the frontend folder, run:

npm run dev

Vite will start the app locally, usually on:

http://localhost:5173
10) Open the app in your browser

Open the frontend URL shown in the terminal.

11) Add an appointment

Use the form to enter:

customer name
phone number
appointment time

Then click Save appointment.

12) Check the backend terminal

After submitting the form, the backend terminal should show the simulated confirmation message.

13) Check the dashboard

The appointment should appear in the live dashboard.

14) Test the reminder logic

Create an appointment time that is within 1 hour from the current time.

The reminder job runs every minute, so the backend terminal should eventually show the simulated reminder message.

15) Confirm the reminder update

After the reminder runs, the appointment should be updated in MySQL so it is not sent again.

How the Data Flows
The user enters appointment details in the React form.
The frontend sends the data to the Express backend.
The backend validates the input and saves the record in MySQL.
The backend simulates a confirmation message.
The frontend fetches the latest data and updates the dashboard.
A scheduled job checks every minute for appointments within 1 hour.
When a reminder is due, the backend simulates the reminder message and marks it as sent.
Mock Sender Behavior

This project uses a mock sender instead of a real WhatsApp or SMS provider.

That means:

no paid messaging service is required
the project stays fully free
the backend terminal clearly shows where the real message would be sent

This approach is useful when a real messaging provider is not available, while still keeping the send flow clear and understandable.

Demo Video

You can place your demo video link here:

Demo Video: https://1drv.ms/v/c/a9e0688a1c14fa97/IQDRkb1YIoX1SoOh1qfhtuNxAc2oj3Fcs-Lhxg1m8e-HR8A?e=EErjB3

Notes
The reminder job checks every minute.
A reminder is sent only once for each eligible appointment.
The project is meant to be run locally.
Make sure MySQL is running before starting the backend.
If the backend cannot connect to MySQL, verify the credentials in backend/.env.
Troubleshooting
404 on API requests

If the frontend cannot reach the backend, check that:

backend is running on port 5000
VITE_API_BASE_URL is set correctly
the frontend was restarted after editing .env
Database connection errors

If the backend cannot connect to MySQL, confirm:

MySQL service is running
database name is correct
username and password are correct
database/schema.sql has been executed
Reminder not appearing

If reminders are not appearing, confirm:

the appointment time is within 1 hour
reminder_sent is still 0
the backend terminal is running continuously
the reminder job is active
License

This project is for educational and demonstration purposes.