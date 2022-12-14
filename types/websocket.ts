import { Message } from "@prisma/client";

export interface ServerToClientEvents {
  updateMessages: (msgs: Message[]) => void;
}
export interface ClientToServerEvents {
  newMessage: (msg: string, user: string) => void;
  deleteAllMessages: () => void;
}
