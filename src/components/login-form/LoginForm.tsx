"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { login } from "@/lib/action";
import styles from "./login-form.module.scss";
import { PAGE_ROUTES } from "@/lib/helpers/const";

const LoginForm: React.FC = () => {
  const [state, formAction] = useFormState(login, undefined);

  return (
    <div className={styles.container}>
      <form action={formAction}>
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <button>Login</button>
        {state?.error}
        <Link href={PAGE_ROUTES.register}>
          {"Don't have an account?"} <b>Register</b>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
