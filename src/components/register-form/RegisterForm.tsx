"use client";

import { register } from "@/lib/action";
import styles from "./register-form.module.scss";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { PAGE_ROUTES } from "@/lib/helpers/const";
import useFormPending from "@/hooks/useFormPending";
import ButtonForm from "../button-form/ButtonForm";
import { StateAdminForm } from "@/types/utils.type";

const RegisterForm: React.FC = () => {
  const [state, formAction] = useFormState<StateAdminForm, FormData>(register, {
    error: null,
  });
  const { isPending, setIsPending } = useFormPending();

  const router = useRouter();
  useEffect(() => {
    state?.success && router.push(PAGE_ROUTES.login);
  }, [router, state?.success]);

  return (
    <div className={styles.container}>
      <form action={formAction}>
        <input
          type="text"
          name="username"
          placeholder="username"
          disabled={isPending}
        />
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
        <input
          type="password"
          name="passwordRepeat"
          placeholder="password again"
          disabled={isPending}
        />
        <ButtonForm setIsPending={setIsPending}>Register</ButtonForm>
        {state?.error}
        <Link href={PAGE_ROUTES.login}>
          Have an account? <b>Login</b>
        </Link>
      </form>
    </div>
  );
};

export default RegisterForm;
