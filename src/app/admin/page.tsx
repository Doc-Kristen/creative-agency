import PostForm from "@/components/post-form/PostForm";
import styles from "./admin.module.scss";
import { Suspense } from "react";
import AdminPosts from "@/components/admin-posts/AdminPosts";
import AdminUsers from "@/components/admin-users/AdminUsers";
import AdminUserForm from "@/components/admin-user-form/AdminUserForm";
import { auth } from "@/lib/auth";

export const metadata = {
  title: "Admin",
  description: "Admin description",
};

const AdminPage: React.FC = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminPosts />
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
          <AdminUserForm userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
