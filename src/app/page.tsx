"use server";
import Link from "next/link";
import Image from "next/image";
import styles from "./home.module.scss";
import redditIcon from "../../public/img/reddit.svg?url";
import discordIcon from "../../public/img/discord.svg?url";
import twitchIcon from "../../public/img/twitch.svg?url";
import { PAGE_ROUTES } from "@/lib/helpers/const";

const brands = [
  { src: redditIcon, name: "Reddit" },
  { src: twitchIcon, name: "Twitch" },
  { src: discordIcon, name: "Discord" },
];

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
          <Link href={`${PAGE_ROUTES.contact}`} className={styles.button}>
            Contact
          </Link>
        </div>
        <ul className={styles.brandsList}>
          {brands.map((partner) => {
            return (
              <li key={partner.name} className={styles.brandsItem}>
                <Image
                  src={partner.src}
                  alt={partner.name}
                  fill
                  className={styles.brandImg}
                />
              </li>
            );
          })}
        </ul>
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
