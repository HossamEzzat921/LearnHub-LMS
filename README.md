LearnHub LMS is an e-learning platform that allows:
- Educators to create and manage courses
- Students to enroll, learn, and track progress
- Secure authentication and payments
- Interactive video-based learning experience

The system is built with scalability and real-world LMS workflows in mind.

---

## ✨ Features

### 👨‍🎓 Student Features
- Browse and search courses
- Enroll in paid/free courses
- Track learning progress
- Watch video lessons
- Access personal dashboard

### 👨‍🏫 Educator Features
- Create and manage courses
- Upload course content and thumbnails
- Track enrolled students
- View analytics and revenue insights

### 🔐 Authentication & Security
- Secure login & registration
- Role-based access (Student / Educator)
- Protected routes

### 💳 Payments
- Course purchase workflow

### 📊 Dashboard
- Student progress tracking
- Educator analytics
- Course performance insights

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite / CRA (depending on your setup)
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose

### Integrations
- Malter
- YouTube API / Embedded video support

---

## 📁 Project Structure
LearnHub-LMS
├── client/ # Frontend (React)
│ ├── src/
│ ├── components/
│ └── pages/
│

├── server/ # Backend (Node + Express)
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── config/
│
└── README.md

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
``bash
git clone https://github.com/HossamEzzat921/LearnHub-LMS.git
cd LearnHub-LMS
2️⃣ Install dependencies
Backend
cd server
npm install
Frontend
cd client
npm install
3️⃣ Environment Variables

Create .env files in both client and server.

Backend .env
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret

STRIPE_SECRET_KEY=your_stripe_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
Frontend .env
VITE_API_URL=http://localhost:3000
4️⃣ Run the project
Start backend
cd server
npm run dev
Start frontend
cd client
npm run dev
📡 API Endpoints
Auth
POST /api/auth/register
POST /api/auth/login
Courses
GET /api/courses
POST /api/courses
GET /api/courses/:id
Users
GET /api/users/me
POST /api/users/enroll
