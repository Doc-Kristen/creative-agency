import PostCard from "@/components/post-card/PostCard";
import styles from "./blog.module.scss";
import { IPost } from "@/types/IPost.type";
import { getPosts } from "@/lib/data";

export const metadata = {
  title: "Blog",
  description: "Blog description",
};

const BlogPage: React.FC = async () => {
  const posts = await getPosts();

  return (
    <ul className={styles.container}>
      {posts.map((post: IPost) => {
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
