import Image from "next/image";
import Link from "next/link";
import styles from "./post-card.module.scss";
import { IPost } from "@/types/IPost.type";
import { formatDate } from "@/lib/utils";

const PostCard: React.FC<{ post: IPost }> = ({ post }) => {
  const date = formatDate(post.createdAt);
  return (
    <article className={styles.container}>
      <div className={styles.top}>
        {post.img && (
          <div className={styles.imgContainer}>
            <Image src={post.img} alt="" fill className={styles.img} />
          </div>
        )}
        <time dateTime={post.createdAt} className={styles.date}>
          {date}
        </time>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.desc}>{post.description}</p>
        <Link className={styles.link} href={`/blog/${post.slug}`}>
          READ MORE
        </Link>
      </div>
    </article>
  );
};

export default PostCard;
