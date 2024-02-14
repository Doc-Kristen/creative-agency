"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { login } from "@/lib/action";
import styles from "./login-form.module.scss";

const LoginForm: React.FC = () => {
  const [state, formAction] = useFormState(login, undefined);

  return (
    <div className={styles.container}>
      <form action={formAction}>
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <button>Login</button>
        {state?.error}
        <Link href={"/register"}>
          {"Don't have an account?"} <b>Register</b>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
