import TextBubble from "./TextBubble";
const ChatDisplay = ({ messages }: ChatDisplayProps) => {
  return (
    <ul style={{ paddingTop: "0.5rem" }}>
      {messages.map(({ content, user, id }) => {
        return <TextBubble content={content} user={user} key={id} />;
      })}
    </ul>
  );
};

export type ChatDisplayProps = {
  messages: {
    id: number;
    user: string;
    content: string;
  }[];
};

export default ChatDisplay;
