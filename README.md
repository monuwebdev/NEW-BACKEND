# Suman Medihub — Backend + Admin (Node/Express/MongoDB)

Simple admin panel to manage **Doctors** and a public API at `/api/doctors`.

## Quick start (Local)
1. Install Node.js 18+
2. Create `.env` (copy `.env.sample`) and set:
   - `MONGO_URI` (from MongoDB Atlas)
   - `ADMIN_USER`, `ADMIN_PASS`
3. Install deps: `npm install`
4. Seed dummy data: `npm run seed`
5. Run: `npm run dev`
6. Open: `http://localhost:8080/admin` (login with your `.env` creds)

## Deploy to Render (Web Service)
- Create new **Web Service**
- Repository root: this folder
- Build command: `npm install`
- Start command: `node server.js`
- Add Environment Variables: `MONGO_URI`, `ADMIN_USER`, `ADMIN_PASS`, `PORT` (`8080` or leave blank)

## Connect Frontend
- Frontend doctor cards can be fed from `https://YOUR_BACKEND_HOST/api/doctors`
- Modify `script.js` (frontend) to `fetch` this API if desired.
