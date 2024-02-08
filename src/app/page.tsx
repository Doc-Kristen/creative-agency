import Link from "next/link";
import Image from "next/image";
import styles from "./home.module.scss";

const Home: React.FC = () => {
  return (
    <section className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Creative Thoughts Agency.</h1>
        <p className={styles.description}>
          Welcome to Creative Thoughts Agency, where innovative ideas come to
          life. We believe in the power of creativity to transform businesses
          and captivate audiences.
        </p>
        <div className={styles.buttons}>
          <Link href={"#"} className={`${styles.button} ${styles.button_blue}`}>
            Learn more
          </Link>
          <Link href={"#"} className={styles.button}>
            Contact
          </Link>
        </div>
        <div className={styles.brands}>
          <Image
            src={"/img/brands.png"}
            alt=""
            fill
            className={styles.brandImg}
          />
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image
          src={"/img/hero.gif"}
          alt={" "}
          width={500}
          height={500}
          className={styles.heroImg}
        />
      </div>
    </section>
  );
};

export default Home;
