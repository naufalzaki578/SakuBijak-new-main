import app from "../dist/index.js";

// Vercel invokes this handler per-request. The Express app itself is
// a valid (req, res) handler, so we can hand requests straight to it
// once the TypeScript build (tsc -> dist/) has produced dist/index.js.
export default function handler(req, res) {
  return app(req, res);
}