# User Login Analysis Dashboard

## Description

This module provides an interactive dashboard for the **User Login Pattern Analysis** project. It is responsible for visualizing user login statistics and presenting meaningful insights through charts and dashboard cards.

The dashboard is developed using **React.js** and communicates with the backend through REST APIs. It displays information such as total users, active users, inactive users, total login count, login trends, and login status analytics.

The module enables administrators to monitor user login activities in a simple and intuitive interface.

---

## Integration with Main Project

The Dashboard module acts as the visualization layer of the application.

It consumes data exposed by the Spring Boot backend through REST APIs. The backend retrieves login information from the PostgreSQL database and returns processed statistics. The frontend fetches this data using Axios and renders it dynamically using dashboard cards and charts.

The dashboard provides administrators with real-time insights into user login behavior without directly interacting with the database.

---

## Technologies Used

### Frontend

* React.js
* Vite
* JavaScript (ES6)
* Axios
* Bootstrap 5
* Chart.js
* React Chart.js 2
* CSS3

### Backend (Integrated)

* Spring Boot REST API
* PostgreSQL

---

## Prerequisites

Before running the application, ensure the following software is installed:

* Node.js (v18 or later)
* npm
* Git
* Spring Boot Backend (Running)
* PostgreSQL Database

---

## Dependencies

The project uses the following major packages:

* react
* react-dom
* axios
* bootstrap
* chart.js
* react-chartjs-2
* vite

Install all dependencies using:

```bash
npm install
```

---

## Running the Application

Start the development server using:

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

## Backend Configuration

Ensure that the Spring Boot backend is running before starting the frontend.

Default backend URL:

```
http://localhost:8080
```

Axios communicates with the backend through REST APIs.

Example API:

```
GET /api/dashboard
```

---

## Dashboard Components

The dashboard displays the following information:

* Total Users
* Active Users
* Inactive Users
* Total Login Count
* Last 7 Days Login Count

### Charts

* Active vs Inactive Users Pie Chart
* Successful vs Failed Login Doughnut Chart
* Last 7 Days Login Trend Line Chart

---

## Features Implemented

* Dashboard summary cards
* REST API integration using Axios
* Dynamic dashboard updates
* Active vs Inactive Users visualization
* Login Success vs Failed Login analysis
* Last 7 Days Login Trend visualization
* Responsive user interface
* Interactive charts using Chart.js
* Component-based React architecture

---

## Future Enhancements

* Date range filtering
* Export dashboard reports
* Role-based dashboard
* Real-time analytics
* Dark mode support
* Advanced login reports

---

## Author

**Umakant Yadav**

MCA Student

National Institute of Technology Agartala
