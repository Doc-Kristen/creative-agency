import { register } from "@/lib/action";
import styles from "./register-form.module.scss";

const RegisterForm: React.FC = () => {
  return (
    <div className={styles.container}>
      <form action={register}>
        <input type="text" name="username" placeholder="username" />
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <input
          type="password"
          name="passwordRepeat"
          placeholder="password again"
        />
        <button>Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
