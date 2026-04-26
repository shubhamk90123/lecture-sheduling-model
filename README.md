# 🎓 Lecture Scheduling Model

A robust, conflict-aware web application designed to streamline academic scheduling. This platform allows administrators to manage courses and faculty members while ensuring that instructors are never double-booked on the same date.

**🚀 Live Demo:** [lecture-sheduling-model-2.onrender.com](https://lecture-sheduling-model-2.onrender.com/)

---

## ✨ Features

### 🔐 Multi-Portal Access
- **Admin Portal**: Full control over the curriculum and faculty assignments.
- **Instructor Portal**: Personal dashboard for faculty to track their assigned sessions and durations.

### 📅 Smart Scheduling
- **Conflict Detection**: Built-in logic prevents scheduling an instructor for multiple lectures on the same date.
- **Duration Management**: Flexible lecture duration tracking (capped at 120 minutes for optimal learning sessions).
- **Date Validation**: Prevents scheduling sessions in the past.

### 📚 Course & Faculty Management
- **Dynamic Course Creation**: Add courses with levels (Beginner, Intermediate, Advanced) and descriptions.
- **Instructor Tracking**: Manage a pool of instructors and map them to relevant modules.

### 📊 Modern Dashboard
- Real-time analytics showing total courses, active instructors, and upcoming scheduled sessions.
- Clean, responsive UI built with custom CSS and a premium aesthetic.

---

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Frontend**: EJS (Embedded JavaScript), Vanilla CSS, FontAwesome
- **Security**: JWT Authentication, Bcrypt, Helmet, Express-Rate-Limit, Mongo-Sanitize
- **Logging**: Winston Logger

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB instance

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shubhamk90123/lecture-sheduling-model.git
   cd lecture-sheduling-model
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_random_string
   PORT=3002
   ```

4. **Run the application:**
   ```bash
   # For production
   npm start

   # For development (with nodemon)
   npm run dev
   ```

---

## ☁️ Deployment

This project is optimized for **Render**.

- **Build Command**: `npm install`
- **Start Command**: `node app.js`
- **Environment Variables**: Ensure `MONGO_URI` and `JWT_SECRET` are added to the Render dashboard.
- **Note**: Ensure your MongoDB Atlas IP Whitelist includes `0.0.0.0/0` to allow Render's dynamic IPs to connect.

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn and create.
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📧 Contact

**Shubham Kumar**  
LinkedIn: [shubhamk90123](https://www.linkedin.com/in/shubham-kamble-1b5569289/)

Project Link: [https://github.com/shubhamk90123/lecture-sheduling-model](https://github.com/shubhamk90123/lecture-sheduling-model)
