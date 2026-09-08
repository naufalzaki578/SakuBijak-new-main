import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db.js";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24, // 1 day - update session if older than 1 day
  },
  trustedOrigins: [process.env.FRONTEND_URL || "http://localhost:5173"],
  // Backend and frontend live on two different Vercel domains in
  // production, so the session cookie must be marked SameSite=None and
  // Secure, or the browser will silently refuse to send it back on
  // cross-origin requests (the classic "login succeeds but session
  // doesn't stick" symptom).
  advanced: {
    defaultCookieAttributes:
      process.env.NODE_ENV === "production"
        ? {
            sameSite: "none",
            secure: true,
          }
        : undefined,
  },
});