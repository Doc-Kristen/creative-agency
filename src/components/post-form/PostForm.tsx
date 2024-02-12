"use client";

import React from "react";
import styles from "./post-form.module.scss";
import { addPost } from "@/lib/action";

const PostForm: React.FC = ({ userId }) => {
  return (
    <form action={addPost} className={styles.container}>
      <h1>Add New Post</h1>
      <input type="hidden" name="userId" value={userId} />
      <input type="text" name="title" placeholder="Title" />
      <input type="text" name="slug" placeholder="slug" />
      <input type="text" name="img" placeholder="img" />
      <textarea name="description" placeholder="description" rows={10} />
      <button>Add</button>
    </form>
  );
};

export default PostForm;
