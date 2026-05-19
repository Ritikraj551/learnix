# Learnix — Frontend

This repository contains the frontend scaffold for Learnix. It is a Vite + React structure containing pages, components, services and placeholders for integrations (Razorpay, Google OAuth, Cloudinary) mapped to the backend API.

Quick notes

- Framework: Vite + React (files scaffolded). Install dependencies manually.
- Styling: TailwindCSS 

How this scaffold maps to backend features

- Auth: `src/services/authService.js` placeholder functions for login/register/logout/googleAuth. Backend routes: `/auth/login`, `/auth/register`, `/auth/google`.
- Courses: `src/services/courseService.js` has placeholders: `/courses`, `/courses/:id`, `/courses/upload` (Cloudinary upload proxy).
- Lectures: part of course detail/lecture pages; backend exposes `/courses/:id/lectures`.
- Reviews: `src/services/reviewService.js` placeholders: `/reviews` (GET/POST) and query by `courseId`.
- Payments: `src/services/paymentService.js` placeholders for `/payment/order` and `/payment/verify` to integrate Razorpay.

Files & structure

- `index.html`, `vite.config.js`
- `public/assets/` (images and media). Common files used by the scaffold:
  - `/public/assets/logo.jpg` — brand logo used in header
  - `/public/assets/home.jpg` — home hero image used on Home page
  - `/public/assets/empty.jpg` — default course thumbnail placeholder
  - `/public/assets/google.jpg` — icon used on Google sign-in buttons
  - other images and media in `/public/assets`
- `src/`:
  - `index.jsx`, `App.jsx`
  - `routes/AppRoutes.jsx` — app routing
  - `components/` — `layout`, `auth`, `course`, `payment`, `review`, `common` components
  - `pages/` — `Home`, `Login`, `Register`, `Courses`, `CourseDetail`, `CreateCourse`, `Lecture`, `Profile`, `Checkout`, `NotFound`
  - `services/` — `api.js`, `authService.js`, `courseService.js`, `paymentService.js`, `reviewService.js`, `userService.js` (placeholders)
  - `context/AuthContext.js`, `hooks/*`
  - `styles/globals.css` (keeps minimal resets; Tailwind)

Placeholders and next steps

1. Install dependencies locally in the `Frontend` folder (example):

```powershell
npm install
```

2.  Wire API calls: replace placeholder throws with actual calls using `fetch` or `axios` and `BASE_URL` from `src/services/api.js`.
3. Razorpay: backend should expose `/payment/order` to create order; frontend should call `paymentService.createOrder()` and then open Razorpay checkout with returned orderId. After payment, call `/payment/verify` to confirm.
4. Google Auth: use backend `/auth/google` endpoint. Frontend button should retrieve Google credential and send to backend to exchange for our JWT/session.