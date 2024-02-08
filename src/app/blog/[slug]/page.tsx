import Image from "next/image";
import styles from "./single-post-page.module.scss";

const SinglePostPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src={"/img/post.jpg"} alt="" fill className={styles.img} />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Title</h1>
        <div className={styles.detail}>
          <div className={styles.avatarContainer}>
            <Image
              src={"/img/no-avatar.png"}
              alt=""
              fill
              className={styles.avatar}
            />
          </div>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>12.02.2024</span>
          </div>
        </div>
        <div className={styles.content}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam a
          amet pariatur? Id iusto nam voluptatibus quia provident quibusdam
          repellat distinctio dicta odio doloremque, voluptates molestiae
          possimus dolorum maiores aspernatur earum non.
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
