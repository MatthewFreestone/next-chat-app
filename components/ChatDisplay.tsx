import TextBubble from "./TextBubble";
import { Message } from "@prisma/client";
const ChatDisplay = ({ messages }: ChatDisplayProps) => {
  return (
    <ul>
      {messages.map(({ content, user, id }) => {
        return <TextBubble content={content} user={user} key={id} />;
      })}
    </ul>
  );
};

export type ChatDisplayProps = {
  messages: Message[]
};

export default ChatDisplay;
