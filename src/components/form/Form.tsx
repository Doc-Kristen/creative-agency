import React from "react";
import styles from "./form.module.scss";

const Form: React.FC = () => {
  return (
    <form action="" className={styles.form}>
      <input type="text" placeholder="Name and Surname" />
      <input type="text" placeholder="Email Address" />
      <input type="text" placeholder="Phone Number (Optional)" />
      <textarea
        name=""
        id=""
        cols={30}
        rows={10}
        placeholder="Message"
      ></textarea>
      <button className={styles.button}>Send</button>
    </form>
  );
};

export default Form;
