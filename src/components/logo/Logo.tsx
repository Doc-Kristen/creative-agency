"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import LogoIcon from "../../../public/img/logo.svg";
import { PAGE_ROUTES } from "@/lib/helpers/const";
import styles from "./logo.module.scss";

const Logo = () => {
  const pathName = usePathname();

  return pathName === PAGE_ROUTES.main ? (
    <LogoIcon
      width={50}
      height={50}
      fill="currentColor"
    />
  ) : (
    <Link href={PAGE_ROUTES.main} className={styles.logo}>
      <LogoIcon width={50} height={50} fill="currentColor" />
    </Link>
  );
};

export default Logo;
