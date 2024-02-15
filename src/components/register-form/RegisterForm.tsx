"use client";

import { register } from "@/lib/action";
import styles from "./register-form.module.scss";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { PAGE_ROUTES } from "@/lib/helpers/const";

const RegisterForm: React.FC = () => {
  const [state, formAction] = useFormState(register, undefined);
  const router = useRouter();
  useEffect(() => {
    state?.success && router.push(PAGE_ROUTES.login);
  }, [router, state?.success]);

  return (
    <div className={styles.container}>
      <form action={formAction}>
        <input type="text" name="username" placeholder="username" />
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <input
          type="password"
          name="passwordRepeat"
          placeholder="password again"
        />
        <button>Register</button>
        {state?.error}
        <Link href={PAGE_ROUTES.login}>
          Have an account? <b>Login</b>
        </Link>
      </form>
    </div>
  );
};

export default RegisterForm;
