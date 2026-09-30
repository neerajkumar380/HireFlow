# 💼 Job Portal Web Application

A full-stack recruitment platform that connects **job seekers and recruiters** through a secure, scalable, and user-friendly interface. The system supports role-based access, smart job search, and real-time application tracking.

---

## 🚀 Features

### 👤 For Applicants

* Secure **Signup & Login** using JWT
* Dynamic job search with filters:

  * 📍 Location
  * 💰 Salary range
  * 🧑‍💼 Experience level
* Upload resumes
* Track application status in real time
* View applied jobs history

### 🏢 For Recruiters

* Post and manage job listings
* View applicant profiles and resumes
* Update hiring status
* Manage job applications efficiently

### 🔐 Admin Dashboard

* Manage all users (recruiters & applicants)
* Monitor job postings
* Control platform activity

---

## 🛠️ Tech Stack

**Frontend**

* React.js
* Material-UI
* Axios

**Backend**

* Node.js
* Express.js
* MongoDB
* JWT Authentication

---

## 📂 Project Architecture

```
Job-Portal/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🔧 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Hitesh9298/Job-Portal.git
cd Job-Portal
```

### 2️⃣ Install dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

## ▶️ Run the Application

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

```bash
cd frontend
npm start
```

Open in browser:
👉 `http://localhost:3000`

---

## 🔐 Environment Variables (Backend)

Create a `.env` file in `backend/`:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

---

## 📈 Project Impact

* Managed **200+ active job listings**
* Implemented efficient hiring workflow
* Built role-based access control
* Designed scalable REST APIs
* Delivered secure authentication system

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---

## 👨‍💻 About the Developer

**Hitesh Parmar**
B.Tech–M.Tech (CSE), NIT Patna
GitHub: @Hitesh9298
LinkedIn: linkedin.com/in/hitesh9298
