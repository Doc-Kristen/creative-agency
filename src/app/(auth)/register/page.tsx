import React from "react";
import styles from "./register.module.scss";
import RegisterForm from "@/components/register-form/RegisterForm";

const RegisterPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
