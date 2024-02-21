import { getUsers } from "@/lib/data";
import UserRow from "./user-row/UserRow";
import styles from "./admin-users.module.scss";

const AdminUsers: React.FC = async () => {
  const users = await getUsers();

  return (
    <div className={styles.container}>
      <h1>Users</h1>
      {users.map(({ id, img, username }) => (
        <UserRow user={{ id, img, username }} key={id} />
      ))}
    </div>
  );
};

export default AdminUsers;
