import type { NextPage } from "next";
import { useState } from "react";
import ChatDisplay from "../components/ChatDisplay";
import TextInput from "../components/TextInput";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const addMessageHandler = (message: string) => {
    setMessages((prev) => prev.concat(message));
  };
  return (
    <>
      <div className={styles["title-holder"]}>
        <h1 className={styles["title"]}>Chat App</h1>
      </div>
      <div className={styles["chat-display-holder"]}>
        <ChatDisplay messages={messages} />
      </div>
      <TextInput onSend={addMessageHandler} />
    </>
  );
};

export default Home;
