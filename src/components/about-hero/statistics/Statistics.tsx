import styles from "./statistics.module.scss";

interface statisticsItem {
  title: string;
  description: string;
}

interface StatisticsProps {
  statistics: statisticsItem[];
}

const Statistics: React.FC<StatisticsProps> = ({ statistics }) => {
  return (
    <ul className={styles.boxes}>
      {statistics.map((item) => (
        <li key={item.description} className={styles.box}>
          <h2 className={styles.boxTitle}>{item.title}</h2>
          <p className={styles.boxDescription}>{item.description}</p>
        </li>
      ))}
    </ul>
  );
};

export default Statistics;
