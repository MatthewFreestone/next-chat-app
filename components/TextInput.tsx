import { KeyboardEventHandler, useRef } from "react";
import styles from "./TextInput.module.css";
const TextInput = ({ onClick, buttonTitle }: TextInputProps) => {
  const message = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (message.current) {
      onClick(message.current.value);
      message.current.value = "";
    }
  };
  const handleEnter: KeyboardEventHandler = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };
  return (
    <div className={styles["send-bar"]}>
      <input
        aria-label="Input for chat window"
        className={styles["message-input"]}
        ref={message}
        type="text"
        onKeyUp={handleEnter}
      />
      <button className={styles["send-button"]} onClick={handleClick}>
        {buttonTitle}
      </button>
    </div>
  );
};
export type TextInputProps = {
  onClick: (message: string) => void;
  buttonTitle: string;
};
export default TextInput;
