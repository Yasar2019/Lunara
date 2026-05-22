# VibeMatch

VibeMatch is a full-stack 18+ dating MVP with discovery, matching, chat, compatibility scoring, smart conversation starters, and safety tools.

## Tech Stack
- **Frontend:** React + Vite + React Router + Axios
- **Backend:** Node.js + Express + MongoDB + Mongoose
- **Security:** JWT auth, bcrypt, helmet, CORS, cookie-parser, rate limiting, validation, moderation checks

## Project Structure

```text
server/
  src/
    config/db.js
    models/{User,Match,Message,Report}.js
    routes/{authRoutes,userRoutes,discoveryRoutes,matchRoutes,messageRoutes,safetyRoutes}.js
    controllers/{authController,userController,discoveryController,matchController,messageController,safetyController}.js
    middleware/{authMiddleware,errorMiddleware,validateMiddleware,rateLimiter}.js
    utils/{compatibility,conversationStarters,moderation}.js
    scripts/seed.js
    app.js
    server.js
client/
  src/
    components/{Navbar,ProfileCard,MatchCard,ChatBox,ProtectedRoute}.jsx
    pages/{Landing,Login,Register,Onboarding,Discovery,Matches,Chat,EditProfile,SafetySettings}.jsx
    services/{api,authService}.js
    context/AuthContext.jsx
    styles/global.css
    App.jsx
    main.jsx
```

## Local Setup

### 1) Backend
```bash
cd /home/runner/work/Lunara/Lunara/server
cp .env.example .env
npm install
npm run dev
```

### 2) Frontend
```bash
cd /home/runner/work/Lunara/Lunara/client
npm install
npm run dev
```

## Seed Data (18+ profiles only)
```bash
cd /home/runner/work/Lunara/Lunara/server
npm run seed
```

## Key API Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/users/me`
- `PUT /api/users/me`
- `GET /api/users/:id`
- `GET /api/discovery`
- `POST /api/discovery/like/:id`
- `POST /api/discovery/pass/:id`
- `POST /api/discovery/superlike/:id`
- `GET /api/matches`
- `GET /api/matches/:id`
- `GET /api/messages/:matchId`
- `POST /api/messages/:matchId`
- `POST /api/safety/report/:userId`
- `POST /api/safety/block/:userId`
- `GET /api/safety/blocked`

## Notes
- Only users **18+** can register.
- Compatibility score returns **0–100** from shared interests/goals/vibes, age gap, and prompt keyword overlap.
- Conversation starters are template-based (no paid AI APIs).
- Users can only chat if they are matched.
