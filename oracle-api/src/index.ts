import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import assetsRoutes from "./routes/assets";
import lookupRoutes from "./routes/lookup";

const app = express();
const PORT = process.env.PORT ?? 3001;

const allowedOrigins = [
  process.env.CORS_ORIGIN,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://lubesmastery.com",
  "https://www.lubesmastery.com",
  "https://oracleinventory.lubesmastery.com",
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, cb) => {
    // Allow Hostinger temp domains and all configured origins
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    if (origin.endsWith(".hostingersite.com")) return cb(null, true);
    cb(new Error(`CORS: ${origin} not allowed`));
  },
  credentials: true,
}));

app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/assets", assetsRoutes);
app.use("/api/lookup", lookupRoutes);

app.listen(PORT, () => {
  console.log(`Oracle API running on port ${PORT}`);
});
