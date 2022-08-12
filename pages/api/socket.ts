import type { NextApiRequest, NextApiResponse } from "next";
import { insertMessage } from "./insertMessage";
import { Server } from "socket.io";
import { getAllMessages } from "./getMessages";
import type {ServerToClientEvents, ClientToServerEvents} from 'types/websocket'
import { deleteAllMessages } from "./deleteAllMessages";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // @ts-ignore
  const server = res?.socket?.server;
  if (server.io) {
    console.log("Socket is already running, re-registering callback.");
    const io = server.io as Server
    io.removeAllListeners()
    registerCallbacks(io)
  } else {
    console.log("Socket is initializing and registering callbacks");
    const io = new Server<ServerToClientEvents, ClientToServerEvents>(server);
    
    server.io = io;
    registerCallbacks(server.io as Server<ServerToClientEvents, ClientToServerEvents>);
  }

  res.end();
}

const registerCallbacks = (io: Server<ClientToServerEvents, ServerToClientEvents>) => {
  io.on("connection", async (socket) => {
    console.log("A user connected, sending messages");
    socket.emit("updateMessages", await getAllMessages())

    socket.on("newMessage", async (msg, user) => {
      await insertMessage(msg, user);
      const msgs = await getAllMessages();
      io.emit("updateMessages", msgs);
      console.log("SENT UPDATE MESSAGES TO ALL");
    });
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
    socket.on("deleteAllMessages", async () => {await deleteAllMessages(); io.emit("updateMessages", await getAllMessages())})
  });
};
