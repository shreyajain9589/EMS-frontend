# 🚀 Employee Management System – Frontend (Angular 16+)

This is the **frontend application** for the **Employee Management System (EMS)** built using Angular, providing authentication, dashboards, leave management, and role-based access control.

---

## ✨ Features

- 🔐 JWT Authentication (Login / Logout)
- 👥 User Roles: **Admin / Manager / Employee**
- 📊 Dashboard with real-time stats
- 🧑‍💼 Add / Edit / Delete Employees (Admin)
- 🏢 Department Management
- 📝 Leave Apply (Employee)
- ✔ Approve / Reject Leave (Admin / Manager)
- 📱 Fully Responsive UI
- 🔄 REST API Integration with Express backend

---

## 🛠 Tech Stack

| Technology | Usage |
|-----------|--------|
| Angular 16+ | Frontend framework |
| TypeScript | Main language |
| RxJS | Async operations |
| Angular Router | Routing & guards |
| HTML / CSS | UI |
| JWT | Authentication |
| REST API | Backend communication |

---

## 📂 Folder Structure

/src
├── app
│ ├── pages # UI Screens
│ ├── services # API Services
│ ├── guards # Auth Guard
│ ├── pages/layout # Main App Layout
│ └── app.routes.ts
├── assets
└── environments


---

## 🚀 Run Locally

### 1️⃣ Clone Repo
```bash
git clone https://github.com/YOUR-USERNAME/ems-frontend.git
cd ems-frontend
2️⃣ Install Packages
npm install
3️⃣ Start App
npm start
App URL

👉 http://localhost:4200/

🔑 Test Login Roles
| Role     | Access                                            |
| -------- | ------------------------------------------------- |
| Admin    | Full access to Employees, Departments & Approvals |
| Manager  | Approve / Reject leaves                           |
| Employee | Apply & view own leaves only                      |

backend running on
http://localhost:5000/api/

