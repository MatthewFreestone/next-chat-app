import type { NextPage } from "next";
import { useState, useRef, useEffect } from "react";
import ChatDisplay from "../components/ChatDisplay";
import TextInput from "../components/TextInput";
import styles from "../styles/Home.module.css";
import { PrismaClient } from "@prisma/client";

const Home: NextPage = () => {
  type messageType = {
    id: number;
    content: string;
    user: string;
  };
  const [messages, setMessages] = useState<messageType[]>([]);

  const addMessageHandler = (message: string) => {
    const data = {
      content: message,
      user: "User",
    };
    return fetch("http://localhost:3000/api/insertMessage", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((resp) => {
        console.log(resp);
        refreshChatDisplay();
      })
      .catch((err) => console.error(err));
  };

  const refreshChatDisplay = () => {
    fetch("http://localhost:3000/api/getMessages")
      .then((resp) => resp.json())
      .then((json) => {
        console.log(json);
        setMessages(json);
      });
  };

  useEffect(refreshChatDisplay, []);

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
