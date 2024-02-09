import Image from "next/image";
import styles from "./single-post-page.module.scss";
import PostUser from "@/components/post-user/PostUser";
import { Suspense } from "react";
import { getPost } from "@/lib/data";
import { ParsedUrlQuery } from "node:querystring";

interface Params extends ParsedUrlQuery {
  slug: string;
}

interface Props {
  params: Params;
}

const SinglePostPage: React.FC<Props> = async ({ params }) => {
  const { slug } = params;
  const post = await getPost(slug);

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        {post?.img && (
          <Image src={post.img} alt="" fill className={styles.img} />
        )}
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post?.title}</h1>
        {post && (
          <Suspense fallback={<div>Loading...</div>}>
            <PostUser userId={post.userId} />
          </Suspense>
        )}
        <div className={styles.content}>{post?.description}</div>
      </div>
    </div>
  );
};

export default SinglePostPage;
