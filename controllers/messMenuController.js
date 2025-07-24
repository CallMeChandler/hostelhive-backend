import { MessMenu } from "../models/messMenuModel.js";


export const getMenu = async (req, res) => {
    try {
        const hostel = req.user.hostel; // ✅
        const menu = await MessMenu.findOne({ hostel }); // ✅
        if (!menu) return res.status(404).json({ message: "No menu found" });
        res.json(menu);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch mess menu" });
    }
};


export const saveMenu = async (req, res) => {
    try {
        const hostel = req.user.hostel;
        const data = req.body;

        let menu = await MessMenu.findOne({ hostel });
        if (!menu) {
            menu = new MessMenu({ week: data.week, hostel });
        } else {
            menu.week = data.week;
            menu.updatedAt = new Date();
        }

        await menu.save();
        res.status(200).json({ message: "Menu saved", menu });
    } catch (err) {
        res.status(500).json({ message: "Failed to save mess menu" });
    }
};

export const updateMessMenu = async (req, res) => {
    try {
        const { day, meals } = req.body;
        const hostel = req.user.hostel;

        if (!day || !meals) {
            return res.status(400).json({ message: "Day and meals are required." });
        }

        const lowerDay = day.toLowerCase(); // 🔑 normalize to schema

        let menu = await MessMenu.findOne({ hostel });
        if (!menu) {
            // initialize empty week object
            menu = new MessMenu({ week: {}, hostel });
        }

        // merge/update meals
        menu.week[lowerDay] = meals;
        menu.updatedAt = new Date();

        await menu.save();
        res.status(200).json({ message: `${day} menu updated.`, menu });
    } catch (err) {
        console.error("Menu update error:", err);
        res.status(500).json({ message: "Failed to update mess menu" });
    }
};
