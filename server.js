import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoute.js";

dotenv.config();
const app = express();

console.log("Working Dir:", process.cwd());
console.log("JWT Secret:", process.env.JWT_SECRET);


app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/protected", testRoutes);
app.use('/api/users', (req, res) => res.send('User route'));

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
