# HealthTime - Appointment Management System

## Project Summary

HealthTime is a full-stack appointment management system designed to streamline scheduling and interaction between healthcare providers, administrators, and patients. The system enables efficient handling of appointments, user management, and real-time data visualization. The application is built with **ReactJS** for the frontend and **Spring Boot** for the backend, with **MySQL** as the database.

Key features include:
- Appointment management for healthcare providers and patients.
- Role-based user management for administrators, doctors, and patients.
- Real-time data synchronization and secure authentication using **Spring Security** with JWT.
- Easy deployment using Docker.

---

## System Architecture

The project follows a modern client-server architecture:
![architecture](https://github.com/user-attachments/assets/96f8911c-27fd-4c72-b29e-aae20a1ef8fb)

1. **Frontend**: Developed using **ReactJS**, providing a responsive and interactive user interface for managing appointments and user data.
2. **Backend**: Built with **Spring Boot**, handling business logic, user authentication (JWT), and data access.
3. **Database**: MySQL stores user data, appointments, and system configuration.
4. **Containerization**: Docker is used to simplify deployment, bundling the frontend, backend, and database services into an interconnected system.

---

## Installation and Setup Guide

Follow the steps below to launch the HealthTime project using Docker:

### Prerequisites
- Docker and Docker Compose installed on your system.

### Steps to Run the Application

1. **Clone the Repository**:
```
   git clone <repository-url>
   cd healthtime
```
2. **Run the Application**:
```
   docker-compose up --build
```

### Access the Services:
- **phpMyAdmin**: http://localhost:8087

Use the credentials:
`Username: root`
`Password: root`
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8888/swagger-ui

## Test Users

The following test accounts are pre-configured in the system:

### Administrator
- **Email**: `admin@gmail.com`  
- **Password**: `@healthTime`

### Healthcare Providers (Soignants)
- **Email**: `rakine@gmail.com`  
- **Password**: `@healthTime`  
- **Email**: `rami@gmail.com`  
- **Password**: `@healthTime`  

### Patients
- **Email**: `ikram@gmail.com`  
- **Password**: `@healthTime`  
- **Email**: `ayoubi@gmail.com`  
- **Password**: `@healthTime`


