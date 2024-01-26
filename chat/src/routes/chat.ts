import express, { Request } from "express";
import axios from "axios";
import { body, matchedData } from "express-validator";
import Message from "../models/Message";
import multer from "multer";

const router = express.Router();

const upload = multer({ dest: "audio" });
interface MulterRequest extends Request {
    file?: any;
}

router.post(
    "/", 
    body("message"),
    async (req: MulterRequest, res) => {
        try {
            const user: any = await axios.get("http://users:8001/api/users", {
                headers: {
                    "Authorization": req.headers.authorization
                }
            });

            const data = matchedData(req);
            const message = new Message({
                userId: user.data.id,
                message: data.message,
            }); 
        } catch (err) {
            res.status(401).send("Unauthorized");
        }
    });

router.post(
    "/voice",
    upload.single("voice"),
    async (req: MulterRequest, res) => {
        try {
            const user: any = await axios.get("http://users:8001/api/users", {
                headers: {
                    "Authorization": req.headers.authorization
                }
            });

            const message = new Message({
                userId: user.data.id,
                voicePath: req.file.path,
            });
        } catch (err) {
            res.status(401).send("Unauthorized");
        }
    });

router.get("/", async (req, res) => {
    try {
        const messages = await Message.find({});
        res.send(messages);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        res.send(message);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

export default router;