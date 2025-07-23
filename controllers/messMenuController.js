import { MessMenu } from "../models/messMenuModel.js";


export const getMenu = async (req, res) => {
    try {
        const menu = await MessMenu.findOne();
        res.json(menu);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch mess menu" });
    }
};


export const saveMenu = async (req, res) => {
    try {
        const data = req.body;

        let menu = await MessMenu.findOne();
        if (!menu) {
            menu = new MessMenu({ week: data.week });
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

        if (!day || !meals) {
            return res.status(400).json({ message: "Day and meals are required." });
        }

        const lowerDay = day.toLowerCase(); // 🔑 normalize to schema

        let menu = await MessMenu.findOne();
        if (!menu) {
            // initialize empty week object
            menu = new MessMenu({ week: {} });
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
