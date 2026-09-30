# 💼 HireFlow — Full-Stack Recruitment Platform

**HireFlow** is a full-stack recruitment platform designed to connect **job seekers, recruiters, and administrators** through a secure, scalable, and user-friendly interface.

The platform provides role-based access, advanced job discovery, resume management, application tracking, recruiter hiring workflows, and administrative controls.

---

## 🚀 Key Features

### 👤 Job Seekers

* 🔐 Secure **Signup & Login** using JWT authentication
* 🔎 Search and browse available job opportunities
* 📍 Filter jobs by location
* 💰 Filter jobs by salary range
* 🧑‍💼 Filter jobs by experience level
* 📄 Upload and manage resumes
* 📩 Apply for jobs directly through the platform
* 📊 Track application status
* 🗂️ View complete applied-jobs history
* 👤 Manage personal profile information

### 🏢 Recruiters

* 🔐 Secure recruiter authentication
* ➕ Create and publish job listings
* ✏️ Edit and manage posted jobs
* 🗑️ Remove job listings
* 👥 View applicants for posted jobs
* 📄 Access applicant profiles and resumes
* 🔄 Update application/hiring status
* 📊 Manage recruitment workflow efficiently

### 🛡️ Admin Dashboard

* 👥 Manage applicants and recruiters
* 📋 Monitor registered users
* 💼 Manage job postings
* 🔍 Monitor platform activity
* 🔐 Control role-based access
* 📊 Maintain overall platform administration

---

## ✨ Core Modules

| Module               | Description                                     |
| -------------------- | ----------------------------------------------- |
| 🔐 Authentication    | JWT-based user authentication and authorization |
| 👤 User Management   | Applicant and recruiter profile management      |
| 💼 Job Management    | Create, update, search and manage job postings  |
| 📄 Resume Management | Upload and access applicant resumes             |
| 📩 Applications      | Apply for jobs and manage application lifecycle |
| 🔎 Job Search        | Search jobs using multiple filters              |
| 🏢 Recruitment       | Recruiter-side applicant and hiring management  |
| 🛡️ Administration   | Centralized platform and user management        |

---

## 🛠️ Technology Stack

### Frontend

* ⚛️ **React.js**
* 🎨 **Material-UI (MUI)**
* 🔗 **Axios**

### Backend

* 🟢 **Node.js**
* 🚂 **Express.js**
* 🍃 **MongoDB**
* 🔑 **JWT Authentication**

### Development Tools

* 📦 npm
* 🔧 Git & GitHub
* 🌐 REST APIs
* 🔐 Environment-based configuration

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │      React.js       │
                    │     Frontend        │
                    └──────────┬──────────┘
                               │
                               │ Axios / REST API
                               ▼
                    ┌─────────────────────┐
                    │    Express.js       │
                    │      Backend        │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
                 ▼                           ▼
        ┌─────────────────┐         ┌─────────────────┐
        │ JWT             │         │   Controllers   │
        │ Authentication  │         │   & Routes      │
        └─────────────────┘         └────────┬────────┘
                                             │
                                             ▼
                                   ┌─────────────────┐
                                   │    MongoDB      │
                                   │    Database     │
                                   └─────────────────┘
```

---

## 📂 Project Structure

```text
HireFlow/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── assets/
│   │   └── ...
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🔐 Authentication & Security

HireFlow uses JWT-based authentication to protect user accounts and APIs.

### Security Features

* 🔑 JWT authentication
* 👥 Role-based authorization
* 🛡️ Protected API routes
* 🔒 Secure environment variables
* 🚫 Unauthorized access prevention
* 🔐 Separate permissions for applicants, recruiters, and administrators

### User Roles

```text
                 ┌──────────────┐
                 │     Admin    │
                 └──────┬───────┘
                        │
             ┌──────────┴──────────┐
             ▼                     ▼
      ┌─────────────┐       ┌─────────────┐
      │  Recruiter  │       │  Applicant  │
      └─────────────┘       └─────────────┘
```

---

## 🔄 Application Workflow

### Applicant Workflow

```text
Signup / Login
      ↓
Create Profile
      ↓
Search Jobs
      ↓
Apply for Job
      ↓
Track Application
      ↓
View Application Status
```

### Recruiter Workflow

```text
Signup / Login
      ↓
Create Job Listing
      ↓
Receive Applications
      ↓
Review Applicant Profiles
      ↓
View Resumes
      ↓
Update Hiring Status
```

### Admin Workflow

```text
Admin Login
     ↓
Dashboard
     ↓
Manage Users
     ↓
Monitor Job Listings
     ↓
Manage Platform Activity
```

---

## 🔎 Job Search & Filtering

Applicants can discover relevant opportunities using:

* 📍 **Location**
* 💰 **Salary Range**
* 🧑‍💼 **Experience Level**
* 💼 Job-related information
* 🔎 Dynamic search functionality

---

## 📩 Application Tracking

HireFlow allows applicants to monitor their applications throughout the recruitment process.

Example application lifecycle:

```text
Applied
   ↓
Under Review
   ↓
Shortlisted
   ↓
Interview
   ↓
Selected / Rejected
```

Recruiters can update application status as candidates move through the hiring process.

---

## 🌐 REST API

The backend follows a REST-based architecture for communication between the React frontend and Express backend.

Typical API modules include:

```text
/api/auth
/api/users
/api/jobs
/api/applications
/api/admin
```

> Endpoint names may vary depending on the current backend implementation.

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/neerajkumar380/HireFlow.git
cd HireFlow
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

### Environment Variables

| Variable     | Description                            |
| ------------ | -------------------------------------- |
| `PORT`       | Backend server port                    |
| `MONGO_URI`  | MongoDB connection string              |
| `JWT_SECRET` | Secret key used for JWT authentication |

> Never commit your `.env` file or expose database credentials and secret keys publicly.

---

## ▶️ Running the Application

### Start Backend

```bash
cd backend
npm run dev
```

Backend:

```text
http://localhost:5000
```

### Start Frontend

```bash
cd frontend
npm start
```

Frontend:

```text
http://localhost:3000
```

---

## 📈 Project Highlights

* 🚀 Full-stack recruitment platform
* 👥 Multiple user roles with role-based access
* 🔐 JWT-based authentication
* 🔎 Dynamic job search and filtering
* 📄 Resume upload and management
* 📩 End-to-end application tracking
* 🏢 Recruiter hiring workflow
* 🛡️ Administrative dashboard
* 🌐 RESTful backend architecture
* 🍃 MongoDB-powered data management
* 📱 Responsive and user-friendly frontend

### Project Impact

* Managed **200+ active job listings**
* Implemented a structured hiring workflow
* Built role-based access control
* Designed scalable REST APIs
* Implemented secure authentication
* Created separate workflows for applicants, recruiters, and administrators

---

## 🔮 Future Enhancements

* 🔔 Real-time application notifications
* 💬 Recruiter–applicant messaging
* 📧 Email notifications
* 🤖 AI-powered job recommendations
* 📊 Advanced recruiter analytics
* 📅 Interview scheduling
* 🔎 Improved resume search
* ☁️ Cloud-based resume storage
* 🐳 Docker support
* 🚀 CI/CD deployment pipeline
* 📱 Progressive Web App support

---

## 🤝 Contributing

Contributions are welcome!

### Steps

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/your-feature
```

3. Make your changes
4. Commit your changes

```bash
git commit -m "Add your feature"
```

5. Push the branch

```bash
git push origin feature/your-feature
```

6. Open a Pull Request

---

## 📄 License

This project is intended for educational and development purposes.

If a specific license is added to the repository, update this section accordingly.

---

## 👨‍💻 About the Developer

### Neeraj Chaurasiya

**Full-Stack Developer | Computer Science & Engineering**

Developer focused on building scalable web applications, backend systems, and user-friendly software solutions.

### Connect With Me

* 🔗 **GitHub:** [@neerajkumar380](https://github.com/neerajkumar380)
* 💼 **LinkedIn:** [Neeraj Chaurasiya](https://www.linkedin.com/in/neeraj-chaurasiyaa/)

---

## ⭐ Support

If you found **HireFlow** useful or interesting, consider giving the repository a ⭐ on GitHub.

Your support is appreciated! ❤️

---

## 📌 Project Summary

**HireFlow** is a full-stack recruitment platform built using **React.js, Material-UI, Node.js, Express.js, MongoDB, and JWT**.

The platform provides dedicated workflows for **applicants, recruiters, and administrators**, covering the recruitment process from job discovery and application to candidate management and hiring.

### 🚀 Built with ❤️ by Neeraj Chaurasiya
