# 🎓 College Event Feedback System

A full-stack web application designed to **gather insightful feedback** from students on college events. It provides intuitive dashboards for both **students** and **administrators**, real-time **sentiment analysis**, and structured **feedback management**.

---

## 🔧 Tech Stack
- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: FastAPI
- **Authentication**: JWT-based auth (Google & Microsoft OAuth supported)
- **Deployment**: Netlify 

---

### ✨ Features

🎤 Event Feedback Collection - Students can submit feedback for college events
📊 Real-time Sentiment Analysis - Powered by TextBlob/NLTK for instant feedback evaluation
👩‍💼 Admin Dashboard - Visual insights into feedback trends and sentiment patterns
🔐 Role-based Access - Separate interfaces for students and administrators
📱 Responsive Design - Works seamlessly on all devices

## 📁 Project Structure
```plaintext
college-feedback-system/
├── backend/  FastAPI backend
│ ├── app/
│ │ ├── api/
│ │ ├── models/
│ │ ├── schemas/
│ │ ├── services/
│ │ └── main.py
│ └── requirements.txt
│
├── frontend/ # React + Tailwind + Vite
│ ├── node_modules/
│ ├── src/
│ │ ├── components/
│ │ │ ├── analytics/
│ │ │ ├── auth/
│ │ │ ├── common/
│ │ │ ├── dashboard/
│ │ │ ├── feedback/
│ │ │ └── layouts/
│ │ ├── contexts/
│ │ ├── pages/
│ │ │ ├── admin/
│ │ │ ├── auth/
│ │ │ └── student/
│ │ ├── services/ # API integration
│ │ ├── App.tsx
│ │ ├── main.tsx
│ │ └── index.css
│ ├── tailwind.config.js
│ ├── vite.config.ts
│ └── package.json
│
├── .gitignore
└── README.md

---

### 🖥️ Screenshots
Landing Page	User Dashboard	Admin Analytics

--

## 🚀 UI Overview
### 1. 🔐 Login & Signup
- OAuth 
- College email validation

### 2. 🔓 Landing Page (Before Login)
- Hero section with CTA
- Features: Feedback Submission, Sentiment Analysis, Admin Dashboard


### 3. 📋 Dashboard (Post-login)
- Sidebar Navigation
- Cards:
  - Submit Feedback
  - Upcoming Events
  - Feedback History with Sentiment badges

### 4. ✍️ Feedback Form
- Event Selector
- Star Rating
- Real-time Sentiment Result (smiley/frown)
- Submit Feedback

---

## 🛠️ Setup Instructions

### 1. Clone the repository

git clone https://github.com/your-username/college-feedback-system.git
cd college-feedback-system

### 2. Frontend Setup (React + Vite)

cd frontend
npm install
npm run dev

**Install Tailwind CSS**

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

### 3. Backend Setup (FastAPI)

cd backend
python -m venv venv
source venv/bin/activate  # on Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

### 4. Environment Variables

**Frontend (frontend/.env)**
VITE_API_URL=http://localhost:8000

**Backend (backend/.env)**

DATABASE_URL=postgresql://user:pass@localhost:5432/feedback_db
JWT_SECRET_KEY=user:pass@localhost:5432/feedback_db

---

### 📊 Features Summary

✅ Student authentication
✅ Admin portal
✅ Feedback submission
✅ Sentiment analysis (real-time)
✅ Event management
✅ Feedback history
✅ Responsive design (Tailwind)

----

### 📦 Future Enhancements

📈 Analytics charts (dashboard)
📨 Email notifications
📥 CSV export of feedback
🔒 Role-based access control

--

### 🤝 Contributors

**Team Name- GodLike**
Members-
      1.**Anurag Verma**
      2.**Kartik Singh**
      3.**Aditya**

--

### 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

### 🏫 Footer

All rights reserved@feedbackhHub
  Designed by- Team GodLike
