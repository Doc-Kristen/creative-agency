import Image from "next/image";
import styles from "./user-info.module.scss";
import { IUser } from "@/types/IUser.type";
import { formatDate } from "@/lib/utils";

interface UserInfoProps {
  user: IUser;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const { img, username, email, createdAt } = user;
  const date = formatDate(createdAt);
  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <Image
          src={img ?? "/img/no-avatar.png"}
          alt=""
          width={150}
          height={150}
        />
      </div>
      <div className={styles.info}>
        <h2 className={styles.title}>Information:</h2>
        <ul className={styles.userInfo}>
          <li className={styles.item}>
            <p className={styles.subtitle}>Name: </p>
            <p className={styles.desc}>{username}</p>
          </li>
          <li className={styles.item}>
            <p className={styles.subtitle}>Email: </p>
            <p className={styles.desc}>{email}</p>
          </li>
          <li className={styles.item}>
            <p className={styles.subtitle}>Registration:</p>
            <p className={styles.desc}>{date}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserInfo;
