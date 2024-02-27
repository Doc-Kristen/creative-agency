import styles from "./footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={"container"}>
        <div className={styles.copyright}>
          <p>Creative thoughts agency © All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
