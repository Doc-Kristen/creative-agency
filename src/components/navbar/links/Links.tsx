import React from "react";
import styles from "./links.module.scss";
import NavLink from "./navLink/NavLink";
import { handleLogout } from "@/lib/action";
import { PAGE_ROUTES } from "@/lib/helpers/const";

interface LinksProps {
  session: any;
}

const Links: React.FC<LinksProps> = async ({ session }) => {
  const isUserSession = session?.user;
  const isAdmin = session?.user?.isAdmin;
  const userId = session?.user.id;

  const links = [
    {
      title: "Homepage",
      path: PAGE_ROUTES.main,
    },
    {
      title: "About",
      path: PAGE_ROUTES.about,
    },
    {
      title: "Contact",
      path: PAGE_ROUTES.contact,
    },
    {
      title: "Blog",
      path: PAGE_ROUTES.blog,
    },
    {
      title: "Profile",
      path: `${PAGE_ROUTES.profile}/${userId}`,
    },
  ];

  return (
    <nav className={styles.links}>
      {links.map((link) => (
        <NavLink key={link.title} title={link.title} path={link.path} />
      ))}
      {isUserSession ? (
        <>
          {isAdmin && <NavLink title={"Admin"} path={PAGE_ROUTES.admin} />}
          <form action={handleLogout}>
            <button className={styles.logout}>Logout</button>
          </form>
        </>
      ) : (
        <NavLink title={"Login"} path={PAGE_ROUTES.login} />
      )}
    </nav>
  );
};

export default Links;
