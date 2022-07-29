import styles from "./TextBubble.module.css";
const TextBubble = ({ key, content }: TextBubbleProps) => {
  return <li key={key} className={styles['text-bubble']}>{content}</li>;
};

export type TextBubbleProps = {
  key: number;
  content: string;
};
export default TextBubble;
