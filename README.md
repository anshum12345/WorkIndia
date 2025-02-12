Here’s a comprehensive `README.md` file for your IRCTC-like Railway Management System API. It includes all the key points, setup instructions, and details on how to test the API using Postman.

---

# IRCTC-like Railway Management System API

This is a Node.js and MySQL-based API for a railway management system similar to IRCTC. It allows users to register, log in, check train availability, book seats, and manage trains (admin-only).

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Setup Instructions](#setup-instructions)
4. [API Endpoints](#api-endpoints)
5. [Testing with Postman](#testing-with-postman)
6. [Assumptions](#assumptions)
7. [License](#license)

---

## Features

- **User Registration and Login**:
  - Users can register and log in to the system.
  - JWT-based authentication for secure access.

- **Train Management (Admin Only)**:
  - Admins can add new trains with source, destination, and total seats.

- **Seat Availability**:
  - Users can check seat availability between two stations.

- **Seat Booking**:
  - Users can book seats on available trains.

- **Booking Details**:
  - Users can view details of their bookings.

- **Role-Based Access**:
  - Admins have access to all operations.
  - Regular users can only check availability and book seats.

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JSON Web Tokens (JWT)
- **Environment Variables**: `dotenv`
- **API Testing**: Postman

---

## Setup Instructions

### Prerequisites

1. **Install Node.js**: Download and install Node.js from [nodejs.org](https://nodejs.org/).
2. **Install MySQL**: Download and install MySQL from [mysql.com](https://www.mysql.com/).
3. **Install Postman**: Download and install Postman from [postman.com](https://www.postman.com/).

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/irctc-api.git
   cd irctc-api
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up MySQL Database**:
   - Log in to MySQL:
     ```bash
     mysql -u root -p
     ```
   - Create the database and tables:
     ```sql
     CREATE DATABASE irctc;
     USE irctc;

     CREATE TABLE users (
         id INT AUTO_INCREMENT PRIMARY KEY,
         username VARCHAR(50) NOT NULL,
         password VARCHAR(255) NOT NULL,
         role ENUM('admin', 'user') DEFAULT 'user'
     );

     CREATE TABLE trains (
         id INT AUTO_INCREMENT PRIMARY KEY,
         name VARCHAR(100) NOT NULL,
         source VARCHAR(100) NOT NULL,
         destination VARCHAR(100) NOT NULL,
         total_seats INT NOT NULL,
         available_seats INT NOT NULL
     );

     CREATE TABLE bookings (
         id INT AUTO_INCREMENT PRIMARY KEY,
         user_id INT,
         train_id INT,
         seats_booked INT,
         FOREIGN KEY (user_id) REFERENCES users(id),
         FOREIGN KEY (train_id) REFERENCES trains(id)
     );
     ```

4. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory:
     ```env
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=yourpassword
     DB_NAME=irctc
     JWT_SECRET=yourjwtsecret
     ```

5. **Start the Server**:
   ```bash
   node app.js
   ```

   The server will start on `http://localhost:3000`.

---

## API Endpoints

### 1. **User Registration**
- **Method**: POST
- **URL**: `/api/auth/register`
- **Body**:
  ```json
  {
      "username": "user1",
      "password": "password1",
      "role": "user"
  }
  ```

### 2. **User Login**
- **Method**: POST
- **URL**: `/api/auth/login`
- **Body**:
  ```json
  {
      "username": "user1",
      "password": "password1"
  }
  ```
- **Response**:
  ```json
  {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

### 3. **Add a New Train (Admin Only)**
- **Method**: POST
- **URL**: `/api/trains/add`
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **Body**:
  ```json
  {
      "name": "Express 1",
      "source": "Station A",
      "destination": "Station B",
      "totalSeats": 100
  }
  ```

### 4. **Get Seat Availability**
- **Method**: GET
- **URL**: `/api/trains/route?source=Station A&destination=Station B`

### 5. **Book a Seat**
- **Method**: POST
- **URL**: `/api/bookings/book`
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **Body**:
  ```json
  {
      "trainId": 1,
      "seats": 2
  }
  ```

### 6. **Get Booking Details**
- **Method**: GET
- **URL**: `/api/bookings/:bookingId`
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```

---

## Testing with Postman

1. **Import the Postman Collection**:
   - Download the Postman collection JSON file from the repository.
   - Import it into Postman:
     - Open Postman.
     - Click `File` > `Import` > `Upload Files` and select the JSON file.

2. **Set Up Environment Variables in Postman**:
   - Create a new environment in Postman.
   - Add the following variables:
     - `base_url`: `http://localhost:3000`
     - `token`: (Leave this blank; it will be updated after login).

3. **Test the Endpoints**:
   - Use the imported collection to test all endpoints.
   - Update the `token` variable after logging in.

---

## Assumptions

- The admin manually adds trains and manages seats.
- Payment processing is not included.
- Users cannot book more seats than available.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Support

For any issues or questions, please open an issue on the [GitHub repository](https://github.com/yourusername/irctc-api).

---

This `README.md` file provides a complete guide to setting up, running, and testing your IRCTC-like Railway Management System API. Let me know if you need further assistance!
