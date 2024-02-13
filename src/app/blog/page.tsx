import PostCard from "@/components/post-card/PostCard";
import styles from "./blog.module.scss";
// import { getPosts } from "@/lib/data";

export const metadata = {
  title: "Blog",
  description: "Blog description",
};

// FETCH DATA WITH AN API
const getData = async () => {
  const res = await fetch(`${process.env.PUBLIC_API_URL}/blog`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

const BlogPage: React.FC = async () => {
  const posts = await getData();

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
