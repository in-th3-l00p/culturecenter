import http from "http";
import express from "express";
import { Server } from "socket.io";

export const app = express();
const server = http.createServer(app);
export const io = new Server(server);
