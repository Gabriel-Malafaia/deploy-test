import http from "http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5174",
  },
});

io.on("connection", (socket: any) => {
  console.log("User Connected");

  io.emit("userConnected", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

httpServer.listen(PORT, () => {
  console.log(`App is running in http://localhost:${PORT}`);
});

export { io };
