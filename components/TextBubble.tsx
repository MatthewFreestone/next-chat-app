import styles from "./TextBubble.module.css";
const TextBubble = ({ content, user }: TextBubbleProps) => {
  return (
    <li className={styles["full-message"]}>
      {user ? <span className={styles["user-label"]}>{user}</span>: undefined}
      <span className={styles["text-bubble"]}>{content}</span>
    </li>
  );
};

export type TextBubbleProps = {
  user?: string;
  content: string;
};
export default TextBubble;
