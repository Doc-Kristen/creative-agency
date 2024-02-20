"use client";

import { useFormStatus } from "react-dom";
import styles from "./button-form.module.scss";

const ButtonForm: React.FC = () => {
  const { pending } = useFormStatus();

  return (
    <button className={styles.button} disabled={pending}>
      {pending ? "Sending..." : "Add"}
    </button>
  );
};

export default ButtonForm;
