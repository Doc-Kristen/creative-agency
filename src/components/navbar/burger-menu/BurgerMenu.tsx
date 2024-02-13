"use client";

import React from "react";
import styles from "./burger-menu.module.scss";

interface BurgerMenuProps {
  children: React.ReactNode;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ children }) => {
  const [isActive, setIsActive] = React.useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <button
        className={`${styles.burger} ${isActive ? styles.open : ""}`}
        onClick={toggleActive}
      >
        <span></span>
      </button>
      <div
        className={`${styles.wrapper} ${isActive ? styles.active : ""}`}
        onClick={toggleActive}
      >
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
};

export default BurgerMenu;
