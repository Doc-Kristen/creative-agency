import Image from "next/image";
import { getUser } from "@/lib/data";
import styles from "./post-user.module.scss";

const PostUser: React.FC<{ userId: string }> = async ({ userId }) => {
  const user = await getUser(userId);

  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <Image
          src={user?.img ?? "/img/no-avatar.png"}
          alt=""
          width={50}
          height={50}
        />
      </div>
      <div className={styles.texts}>
        <span className={styles.title}>Author</span>
        <span className={styles.username}>{user?.username}</span>
      </div>
    </div>
  );
};

export default PostUser;
