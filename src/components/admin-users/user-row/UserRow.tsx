"use client";

import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import Image from "next/image";
import { deleteUser } from "@/lib/action";
import ButtonForm from "@/components/button-form/ButtonForm";
import { StateAdminForm } from "@/types/utils.type";
import { IUserBase } from "@/types/IUser.type";
import styles from "./user-row.module.scss";
import useFormPending from "@/hooks/useFormPending";
import Link from "next/link";
import { PAGE_ROUTES } from "@/lib/helpers/const";

interface UserRowProps {
  user: IUserBase;
}

const UserRow: React.FC<UserRowProps> = ({ user }) => {
  const { isPending, setIsPending } = useFormPending();
  const [state, formAction] = useFormState<StateAdminForm, FormData>(
    deleteUser,
    {
      error: null,
    }
  );

  return (
    <div className={styles.user} key={user.id}>
      <div className={styles.detail}>
        <Image
          src={user.img || "/img/no-avatar.png"}
          alt=""
          width={50}
          height={50}
        />
        <span className={styles.title}>{user.username}</span>
      </div>
      <form action={formAction}>
        <input type="hidden" name="id" value={user.id} />
        <input type="hidden" name="img" value={user.img} />
        <Link
          href={`${PAGE_ROUTES.profile}/${user.id}`}
          className={styles.link}
        >
          Go to user
        </Link>
        <ButtonForm className={"deleteButton"} setIsPending={setIsPending}>
          Delete
        </ButtonForm>
      </form>
      {state?.error}
    </div>
  );
};

export default UserRow;
