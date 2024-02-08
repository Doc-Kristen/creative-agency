import Image from "next/image";
import Link from "next/link";
import styles from "./post-card.module.scss";

interface PostCardProps {
  title: string;
  body: string;
  slug: string;
  createdAt: string;
  img?: string;
  id: string;
}

const PostCard: React.FC<PostCardProps> = (post) => {
  const formattedDate = new Date(post.createdAt)
    .toString()
    .split(" ")
    .slice(1, 3)
    .join(" ");
  return (
    <article className={styles.container}>
      <div className={styles.top}>
        {post.img && (
          <div className={styles.imgContainer}>
            <Image src={post.img} alt="" fill className={styles.img} />
          </div>
        )}
        <time dateTime={post.createdAt} className={styles.date}>
          {formattedDate}
        </time>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.desc}>{post.body}</p>
        <Link className={styles.link} href={`/blog/${post.slug}`}>
          READ MORE
        </Link>
      </div>
    </article>
  );
};

export default PostCard;
