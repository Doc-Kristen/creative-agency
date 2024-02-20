import { handleGithubLogin, handleGoogleLogin } from "@/lib/action";
import LoginForm from "@/components/login-form/LoginForm";
import styles from "./login.module.scss";

const LoginPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form action={handleGithubLogin}>
          <button className={styles.github}>Login with Github</button>
        </form>
        <form action={handleGoogleLogin}>
          <button className={styles.github}>Login with Google</button>
        </form>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
