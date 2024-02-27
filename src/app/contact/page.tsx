import Form from "@/components/form/Form";
import styles from "./contact.module.scss";
import AnimatedLottie from "@/components/animated-lottie/AnimatedLottie";
import animationData from "../../../public/lottie/contact-animation.json";

export const metadata = {
  title: "Contact",
  description: "Contact description",
};

const ContactPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <AnimatedLottie animationData={animationData} />
      </div>
      <div className={styles.formContainer}>
        <Form />
      </div>
    </div>
  );
};

export default ContactPage;
