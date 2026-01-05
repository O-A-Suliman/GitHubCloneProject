# Django Blog Frontend

This is a React frontend (Vite) scaffold for integrating with a Django REST API blog backend.

Quick start:

1. Install dependencies

```bash
cd frontend
npm install
```

2. Run dev server

```bash
npm run dev
```

3. Optional type check

```bash
npm run type-check
```

Notes:
- The app expects the Django API to be served under `/api` (proxy or same host). Adjust `src/services/api.js` `baseURL` if needed.
- Auth endpoints expected:
  - `POST /api/auth/register/` -> returns `{ user:..., token: '...' }`
  - `POST /api/auth/login/` -> returns `{ user:..., token: '...' }`
  - `GET/PUT /api/auth/user/` -> get/update profile
- Blog endpoints expected under `/api/blogs/` with standard REST behavior.
