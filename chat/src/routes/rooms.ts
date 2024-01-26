import express, { Request, Response, NextFunction } from "express";
import { body, matchedData, validationResult } from "express-validator";
import ChatRoom from "../models/ChatRoom";
import { validate } from "../utils";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const rooms = await ChatRoom.find();
        res.json(rooms);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const room = await ChatRoom.findById(req.params.id);
        if (!room) return res.status(404).json({ message: 'Chat room not found' });
        res.json(room);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', 
    body('name')
        .trim().isLength({ min: 1 })
        .withMessage('Name is required'),
    validate,
    async (req: Request, res: Response) => {
        try {
            const newRoom = new ChatRoom(matchedData(req));
            const savedRoom = await newRoom.save();
            res.status(201).json(savedRoom);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
);

router.put('/:id', 
    body('name')
        .optional().trim().isLength({ min: 1 })
        .withMessage('Name must be a non-empty string'),
    validate,
    async (req: Request, res: Response) => {
        try {
            const updatedRoom = await ChatRoom.findByIdAndUpdate(req.params.id, matchedData(req), { new: true });
            if (!updatedRoom) return res.status(404).json({ message: 'Chat room not found' });
            res.json(updatedRoom);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
);

export default router;