import Logo from "../logo/Logo";
import Navbar from "../navbar/Navbar";
import styles from "./header.module.scss";

const Header: React.FC = () => {

  return (
    <header className={`${styles.header} container`}>
      <Logo />
      <div>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
