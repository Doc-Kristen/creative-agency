import Image from "next/image";
import styles from "./single-post-page.module.scss";
import PostUser from "@/components/post-user/PostUser";
import { Suspense } from "react";
import { getPost } from "@/lib/data";
import { IPost } from "@/types/IPost.type";
import type { InferGetServerSidePropsType } from "next";
import { getServerSideProps } from "next/dist/build/templates/pages";

export const generateMetadata = async ({
  params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { slug } = params;

  const post: IPost | null = await getPost(slug);

  return {
    title: post?.title,
    description: post?.description,
  };
};

// FETCH DATA WITH AN API
const getData = async (slug: string) => {
  const res = await fetch(`${process.env.PUBLIC_API_URL}/blog/${slug}`);

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

const SinglePostPage: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = async ({ params }) => {
  const { slug } = params;
  // const post = await getPost(slug);
  const post = await getData(slug);

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
