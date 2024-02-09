import PostCard from "@/components/post-card/PostCard";
import styles from "./blog.module.scss";
import { getPosts } from "@/lib/data";

const BlogPage: React.FC = async () => {
  const posts = await getPosts();

  return (
    <ul className={styles.container}>
      {posts.map((post) => {
        return (
          <li className={styles.post} key={post.id}>
            <PostCard post={post} />
          </li>
        );
      })}
    </ul>
  );
};

export default BlogPage;
