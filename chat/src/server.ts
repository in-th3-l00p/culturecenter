import http from "http";
import express from "express";
import { Server } from "socket.io";
import { createClient } from "redis";

export const app = express();
const server = http.createServer(app);
export const io = new Server(server);
export const redis = createClient({
    url: process.env.REDIS_URL!
});
