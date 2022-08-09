import styles from "./TextBubble.module.css";
const TextBubble = ({ content, user }: TextBubbleProps) => {
  return (
    <li className={styles["full-message"]}>
      {user ? <span className={styles["user-label"]}>{user}</span>: undefined}
      {content ? <span className={styles["text-bubble"]}>{content}</span>: undefined}
    </li>
  );
};

export type TextBubbleProps = {
  user: string | null;
  content?: string | null;
};
export default TextBubble;
