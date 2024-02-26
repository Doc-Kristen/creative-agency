import React from "react";
import styles from "./admin-posts.module.scss";
import PostRow from "./post-row/PostRow";
import { IPostBase } from "@/types/IPost.type";

interface AdminPostsProps {
  posts: IPostBase[];
}

const AdminPosts: React.FC<AdminPostsProps> = async ({ posts }) => {
  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      {posts.map(({ id, img, title, slug }) => (
        <PostRow post={{ id, img, title, slug }} key={id} />
      ))}
    </div>
  );
};

export default AdminPosts;
