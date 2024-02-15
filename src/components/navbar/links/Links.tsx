import React from "react";
import styles from "./links.module.scss";
import NavLink from "./navLink/NavLink";
import { handleLogout } from "@/lib/action";
import { IUser } from "@/types/IUser.type";

interface LinksProps {
  session: any;
}

const Links: React.FC<LinksProps> = async ({ session }) => {
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

  const isUserSession = session?.user;
  const isAdmin = session?.user?.isAdmin;

  return (
    <nav className={styles.links}>
      {links.map((link) => (
        <NavLink key={link.title} title={link.title} path={link.path} />
      ))}
      {isUserSession ? (
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
