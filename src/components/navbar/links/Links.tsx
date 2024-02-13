import React from "react";
import styles from "./links.module.scss";
import NavLink from "./navLink/NavLink";
import { handleLogout } from "@/lib/action";


const Links = async ({ session }) => {
  const links = [
    {
      title: "Homepage",
      path: "/",
    },
    {
      title: "About",
      path: "/about",
    },
    {
      title: "Contact",
      path: "/contact",
    },
    {
      title: "Blog",
      path: "/blog",
    },
  ];

  // Временные данные, пока не реализована авторизация
  const isAdmin = true;

  return (
    <nav className={styles.links}>
      {links.map((link) => (
        <NavLink key={link.title} title={link.title} path={link.path} />
      ))}
      {session ? (
        <>
          {isAdmin && <NavLink title={"Admin"} path={"/admin"} />}
          <form action={handleLogout}>
            <button className={styles.logout}>Logout</button>
          </form>
        </>
      ) : (
        <NavLink title={"Login"} path={"/login"} />
      )}
    </nav>
  );
};

export default Links;
