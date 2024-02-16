import React from "react";
import Links from "./links/Links";
import { auth } from "@/lib/auth";
import BurgerMenu from "./burger-menu/BurgerMenu";

const Navbar: React.FC = async () => {
  const session = await auth();
  console.log(session);

  return (
    <BurgerMenu>
      <Links session={session} />
    </BurgerMenu>
  );
};

export default Navbar;
