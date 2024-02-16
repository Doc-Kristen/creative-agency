import { auth } from "@/lib/auth";
import { PAGE_ROUTES } from "@/lib/helpers/const";
import Link from "next/link";
import React from "react";

const ProfilePage = async () => {
  const session = await auth();
  const userId = session?.user.id;
  return (
    <div>
      <Link href={`${PAGE_ROUTES.profile}/${userId}`}></Link>
    </div>
  );
};

export default ProfilePage;
