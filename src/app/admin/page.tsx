import PostForm from "@/components/post-form/PostForm";
import styles from "./admin.module.scss";
import { Suspense } from "react";
import AdminPosts from "@/components/admin-posts/AdminPosts";
import AdminUsers from "@/components/admin-users/AdminUsers";
import AdminUserForm from "@/components/admin-user-form/AdminUserForm";
import { auth } from "@/lib/auth";
import { getPosts } from "@/lib/data";

export const metadata = {
  title: "Admin",
  description: "Admin description",
};

const AdminPage: React.FC = async () => {
  const session = await auth();
  const userId = session ? session?.user?.id : "";
  const posts = await getPosts();

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminPosts posts={posts} />
          </Suspense>
        </div>
        <div className={styles.col}>
          <PostForm userId={userId} />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminUsers />
          </Suspense>
        </div>
        <div className={styles.col}>
          <AdminUserForm />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
