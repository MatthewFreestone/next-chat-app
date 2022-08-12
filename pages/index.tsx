import type { NextPage } from "next";
import Head from "next/head";
import { useState, useRef, useEffect } from "react";
import ChatDisplay from "../components/ChatDisplay";
import TextInput from "../components/TextInput";
import styles from "../styles/Home.module.css";
import { io, Socket } from "socket.io-client";
import type {Message} from '@prisma/client'
import { ClientToServerEvents, ServerToClientEvents } from "types/websocket";

const Home: NextPage = () => {
  
  const [messages, setMessages] = useState<Message[]>([]);
  const socket = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();

  const addMessageHandler = (message: string) => {
    if (!message) {
      return;
    }

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

  const addMessageHandlerWs = (message: string) => {
    if (!message) {
      return;
    }
    socket?.current?.emit("newMessage", message);
  };

  const deleteAllMessages = () => {
    fetch("/api/deleteAllMessages", {
      method: "POST",
    }).then(() => {
      refreshChatDisplay();
    });
  };

  const deleteAllMessagesWs = () => {
    socket?.current?.emit("deleteAllMessages")
  };

  const refreshChatDisplay = () => {
    fetch("/api/getMessages")
      .then((resp) => resp.json())
      .then((json) => {
        console.log(json);
        setMessages(json);
      });
  };

  const initializeSocket = async () => {
    await fetch("/api/socket");
    socket.current = io();
    socket.current.on("connect", () => {
      console.log("connected");
    });
  };

  const registerSocketCallbacks = () => {
    socket?.current?.on("updateMessages", (msgs) => {
      console.info("Recieved new messages from websocket")
      setMessages(msgs);
    });
  };

  useEffect(() => {
    // refreshChatDisplay();
    initializeSocket().then(
      registerSocketCallbacks
    );
  }, []);

  return (
    <>
      <Head>
        <title>Chat App</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      </Head>
      <div className={styles["title-holder"]}>
        <h1 className={styles["title"]}>Chat App</h1>
      </div>
      <div className={styles["toolbar-holder"]}>
        <button
          className={styles["toolbar-button"]}
          onClick={refreshChatDisplay}
        >
          Refresh
        </button>
        <button
          className={styles["toolbar-button"]}
          onClick={deleteAllMessagesWs}
        >
          Delete All
        </button>
      </div>
      <div className={styles["chat-display-holder"]}>
        <ChatDisplay messages={messages} />
      </div>
      <TextInput onSend={addMessageHandlerWs} />
    </>
  );
};

export default Home;
