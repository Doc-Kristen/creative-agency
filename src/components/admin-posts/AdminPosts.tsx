import Image from "next/image";
import { deletePost } from "@/lib/action";
import styles from "./admin-posts.module.scss";
import { IPost } from "@/types/IPost.type";

interface AdminPostsProps {
  posts: IPost[];
}

const AdminPosts: React.FC<AdminPostsProps> = ({ posts }) => {
  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <div className={styles.detail}>
            <Image
              src={post.img || "/img/no-avatar.png"}
              alt="Post image"
              width={50}
              height={50}
            />
            <span className={styles.postTitle}>{post.title}</span>
          </div>
          <form action={deletePost}>
            <input type="hidden" name="id" value={post.id} />
            <button className={styles.postButton}>Delete</button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default AdminPosts;
