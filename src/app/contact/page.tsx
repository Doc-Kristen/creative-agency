import Image from "next/image";
import Form from "@/components/form/Form";
import styles from "./contact.module.scss";

export const metadata = {
  title: "Contact Page",
  description: "Contact description",
};

const ContactPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="/img/contact.png" alt="" fill className={styles.img} />
      </div>
      <div className={styles.formContainer}>
        <Form />
      </div>
    </div>
  );
};

export default ContactPage;
