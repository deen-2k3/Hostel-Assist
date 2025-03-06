import {LostAndFound }from "../models/LostAndFound.js";

// 📍 Report a Lost Item
export const lostItem = async (req, res) => {
  try {
    const { title, description, location, image } = req.body;
    const newItem = new LostAndFound({
      title,
      description,
      location,
      status: "Lost",
      image,
    });

    await newItem.save();
    res
      .status(201)
      .json({ message: "Lost item reported successfully", newItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📍 Report a Found Item
export const foundItem = async (req, res) => {
  try {
    const { title, description, location, image } = req.body;
    const newItem = new LostAndFound({
      title,
      description,
      location,
      status: "Found",
      image,
    });

    await newItem.save();
    res
      .status(201)
      .json({ message: "Found item reported successfully", newItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
