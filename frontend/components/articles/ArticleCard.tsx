import styles from "./ArticleCard.module.css";

type Props = {
  article: {
    id: number;
    title: string;
    date: string;
    content: string;
  };
};

export default function ArticleCard({ article }: Props) {
  return (
    <div className={`${styles.card} h-100`}>
      <h2 className={styles.title}>{article.title}</h2>
      <p className={styles.date}>
        {new Date(article.date).toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <p className={styles.content}>{article.content}</p>
    </div>
  );
}
