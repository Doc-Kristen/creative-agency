"use client";

import React, { FC, useEffect } from "react";
import { useFormStatus } from "react-dom";
import styles from "./button-form.module.scss";

interface ButtonFormProps {
  setIsPending: (arg: boolean) => void;
  children: string;
  className?: string;
}

const ButtonForm: FC<ButtonFormProps> = ({
  children,
  className,
  setIsPending,
}) => {
  const { pending } = useFormStatus();

  useEffect(() => {
    setIsPending(pending);
  }, [pending, setIsPending]);

  return (
    <button
      className={className ? styles[className] : styles.button}
      disabled={pending}
    >
      {pending ? "Pending..." : children}
    </button>
  );
};

export default ButtonForm;
