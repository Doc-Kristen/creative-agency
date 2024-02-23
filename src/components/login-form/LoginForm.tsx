"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { login } from "@/lib/action";
import styles from "./login-form.module.scss";
import { PAGE_ROUTES } from "@/lib/helpers/const";
import ButtonForm from "../button-form/ButtonForm";
import useFormPending from "@/hooks/useFormPending";

const LoginForm: React.FC = () => {
  const [state, formAction] = useFormState(login, undefined);
  const { isPending, setIsPending } = useFormPending();

  return (
    <div className={styles.container}>
      <form action={formAction}>
        <input
          type="email"
          name="email"
          placeholder="email"
          disabled={isPending}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          disabled={isPending}
        />
        <ButtonForm setIsPending={setIsPending}>Login</ButtonForm>
        {state?.error}
        <Link href={PAGE_ROUTES.register} className={styles.link}>
          {"Don't have an account?"} <b>Register</b>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
