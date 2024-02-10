import React from "react";
import styles from './post-form.module.scss'

const PostForm: React.FC = () => {
  return (
    <form action="" className={styles.container}>
      <h1>Add New Post</h1>
      <input type="hidden" name="userId" />
      <input type="text" name="title" placeholder="Title" />
      <input type="text" name="slug" placeholder="Slug" />
      <input type="text" name="img" placeholder="Image src" />
      <textarea name="description" placeholder="  Description" rows={10} />
      <button>Add</button>
    </form>
  );
};

export default PostForm;
