import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoute.js";
import userRoutes from "./routes/userRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import circularRoutes from "./routes/circularRoutes.js";
import sportsRoutes from "./routes/sportsRoutes.js";
import { SportItem } from "./models/sportsItemModel.js";
import messMenuRoutes from "./routes/messMenuRoutes.js";

dotenv.config();
const app = express();

console.log("Working Dir:", process.cwd());
console.log("JWT Secret:", process.env.JWT_SECRET);


app.use(cors());
app.use(express.json());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));


connectDB();

const seedInitialStock = async () => {
    const count = await SportItem.countDocuments();
    if (count === 0) {
        const defaultStock = [
            { item: "Cricket Bat", qty: 3 },
            { item: "Cricket Ball", qty: 5 },
            { item: "TT Racket", qty: 2 },
            { item: "TT Ball", qty: 12 },
            { item: "Badminton Racket", qty: 6 },
            { item: "Shuttlecock", qty: 5 },
        ];
        await SportItem.insertMany(defaultStock);
        console.log("✅ Default sports stock seeded");
    }
};

seedInitialStock();

app.use("/api/auth", authRoutes);
app.use("/api/protected", testRoutes);
app.use("/api/users", userRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/circulars", circularRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/messmenu", messMenuRoutes);
app.use("/api/sports", sportsRoutes);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
