import Image from "next/image";
import styles from "./single-post-page.module.scss";
import PostUser from "@/components/post-user/PostUser";
import { Suspense } from "react";
import { getPost } from "@/lib/data";

const SinglePostPage: React.FC = async ({ params }) => {
  const { slug } = params;

  const post = await getPost(slug);

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src={"/img/post.jpg"} alt="" fill className={styles.img} />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post?.title}</h1>
        {post && (
          <Suspense fallback={<div>Loading...</div>}>
            <PostUser userId={post.userId} />
          </Suspense>
        )}
        <div className={styles.content}>{post?.body}</div>
      </div>
    </div>
  );
};

export default SinglePostPage;
