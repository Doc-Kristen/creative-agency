import Image from "next/image";
import { getUserById } from "@/lib/data";
import styles from "./post-user.module.scss";

interface PostUserProps {
  userId: string;
}

const PostUser: React.FC<PostUserProps> = async ({ userId }) => {
  const user = await getUserById(userId);

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
