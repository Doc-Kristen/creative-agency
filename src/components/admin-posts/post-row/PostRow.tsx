"use client";

import React from "react";
import { useFormState } from "react-dom";
import Image from "next/image";
import ButtonForm from "@/components/button-form/ButtonForm";
import { deletePost } from "@/lib/action";
import { StateAdminForm } from "@/types/utils.type";
import { IPostBase } from "@/types/IPost.type";
import useFormPending from "@/hooks/useFormPending";
import styles from "./post-row.module.scss";
import Link from "next/link";

interface PostRowProps {
  post: IPostBase;
}

const PostRow: React.FC<PostRowProps> = ({ post }) => {
  const [state, formAction] = useFormState<StateAdminForm, FormData>(
    deletePost,
    {
      error: null,
    }
  );
  const { isPending, setIsPending } = useFormPending();

  return (
    <div className={styles.post} key={post.id}>
      <div className={styles.detail}>
        <Image
          src={post.img || "/img/no-avatar.png"}
          alt="Post image"
          width={50}
          height={50}
        />
        <span className={styles.title}>{post.title}</span>
      </div>
      <form action={formAction}>
        <input type="hidden" name="id" value={post.id} />
        <input type="hidden" name="img" value={post.img} />
        <Link href={post.id} className={styles.link}>
          Go to post
        </Link>
        <ButtonForm className={"deleteButton"} setIsPending={setIsPending}>
          Delete
        </ButtonForm>
      </form>
      {state?.error}
    </div>
  );
};

export default PostRow;
