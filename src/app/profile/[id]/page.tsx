import { getUser, getPostsByUserId } from "@/lib/data";
import type { InferGetServerSidePropsType } from "next";
import { getServerSideProps } from "next/dist/build/templates/pages";
import { Suspense } from "react";
import styles from "./user-profile-page.module.scss";
import PostForm from "@/components/post-form/PostForm";
import AdminPosts from "@/components/admin-posts/AdminPosts";
import UserInfo from "@/components/user-info/UserInfo";

const UserProfilePage: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = async ({ params }) => {
  const { id } = params;
  const user = await getUser(id);
  const userId = user?.id;
  const posts = await getPostsByUserId(userId);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            {user && <UserInfo user={user} />}
          </Suspense>
        </div>
        <div className={styles.col}>
          <PostForm userId={userId} />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminPosts posts={posts} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
