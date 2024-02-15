import Image from "next/image";
import styles from "./about-hero.module.scss";
import Statistics from "./statistics/Statistics";

const statistics = [
  { title: "130 K+", description: "Clients" },
  { title: "10 K+", description: "Year of experience" },
  { title: "99 K+", description: "Positive feedback" },
];

const AboutHero: React.FC = () => {
  return (
    <section className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.subtitle}>About Agency</h2>
        <h1 className={styles.title}>
          We create digital ideas that are bigger, bolder, braver and better.
        </h1>
        <p className={styles.description}>
          We create digital ideas that are bigger, bolder, braver and better. We
          believe in good ideas flexibility and precission We’re world’s Our
          Special Team best consulting & finance solution provider. Wide range
          of web and software development services.
        </p>
        <Statistics statistics={statistics} />
      </div>
      <div className={styles.imgContainer}>
        <Image
          src="/img/about.png"
          className={styles.img}
          width={500}
          height={500}
          alt="About image"
          priority
        />
      </div>
    </section>
  );
};

export default AboutHero;
