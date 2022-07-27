import TextBubble from "./TextBubble";
const ChatDisplay = ({ messages }: ChatDisplayProps) => {
  return (
    <ul style={{"paddingTop": "0.5rem"}}>
      {messages.map((message, index) => {
        return <TextBubble content={message} key={index.toString()} />
      })}
    </ul>
  );
};

export type ChatDisplayProps = {
  messages: string[];
};

export default ChatDisplay;
