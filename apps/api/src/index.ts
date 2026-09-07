import "dotenv/config";
import express, { type Express, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import { categoriesRouter, transactionsRouter, reportsRouter } from "./routes/index.js";

const app: Express = express();
const port = process.env.PORT || 3001;

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Better Auth handler (MUST be before express.json())
app.all("/api/auth/*", toNodeHandler(auth));

// JSON body parser for other routes
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API routes
app.use("/api/categories", categoriesRouter);
app.use("/api/transactions", transactionsRouter);
app.use("/api/reports", reportsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Only bind to a port when running as a normal long-lived Node process
// (local dev, or a traditional server). On Vercel, the platform itself
// invokes the exported `app` handler per-request, so listen() must be
// skipped there to avoid unnecessary/incorrect port binding.
if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🚀 FinTrack API Server                                   ║
║                                                            ║
║   Server:    http://localhost:${port}                         ║
║   Auth:      http://localhost:${port}/api/auth                ║
║   Health:    http://localhost:${port}/health                  ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
    `);
  });
}

export default app;
