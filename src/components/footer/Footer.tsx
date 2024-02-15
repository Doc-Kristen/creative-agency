import styles from "./footer.module.scss";

const Footer: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={"container"}>
        <div className={styles.logo}>Logo</div>
        <div className={styles.text}>
          Creative thoughts agency © All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
