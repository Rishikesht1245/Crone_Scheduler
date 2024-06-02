# Crone Scheduler

[Crone Scheduler](https://crone-scheduler.onrender.com/) is a web application that allows users to create schedules with repeating options (daily, weekly, monthly). The application uses cron jobs to send reminder emails on the specified dates.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Technologies](#technologies)
- [License](#license)

## Features

- User registration and login
- Create schedules with the following repeat options:
  - Daily
  - Weekly
  - Monthly
- Automatic email reminders using cron jobs

## Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/yourusername/crone-scheduler.git
    cd crone-scheduler
    ```

2.  Install server dependencies:

    ```bash
    cd server
    npm install
    ```

3.  Install client dependencies:

    ```bash
    cd ../client
    npm install
    ```

4.  Create a `.env` file in the server directory with the following variables:

```bash

   PORT=3000
   MONGO_URI='your_mongo_uri'
   TRANSPORTER_USERNAME= 'email'
   TRANSPORTER_PASSWORD= 'app password for email'

```

5.  Start the server:

    ```bash
    cd ../server
    npm start
    ```

6.  Create a `.env` file in the server directory with the following variables:

```bash

VITE_BACKEND_API='http://localhost:3000/api/v1/users/'

```

7.  Start the client:

```bash
cd ../client
npm run dev
```

8.  Access the application at `http://localhost:5173`.

## Usage

### User Registration and Login

- Register a new user account.
- Log in with your email and password to access the scheduler.

### Creating a Schedule

1. Click on "New".
2. Fill in the schedule details:

- Name
- Date
- Type (None, Daily, Weekly, Monthly)

3. Save the schedule.

### Receiving Email Reminders

- Ensure your email address is correct.
- The application will send reminder emails based on the schedule type:
- **Daily**: Every day
- **Weekly**: On the same day of each week
- **Monthly**: On the same date each month

## Technologies

- **Frontend**: React, Vite, Tailwind CSS, Shadcn UI
- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose
- **Email**: Nodemailer
- **Scheduling**: node-cron

```

```
