import React, {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useState,
} from "react";
import { track } from "../../tracking/track";
import styles from "./index.module.css";

type SubStatus = "idle" | "active" | "complete" | "error";

const emailExpr = /^[^@]+@\w+(\.\w+)+\w$/i;

export const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubStatus>("idle");

  const isValid = emailExpr.test(email);

  const send = () => {
    setStatus("active");
    track("submit", "subscribe", "send");
    fetch("/api/newsletter", {
      method: "post",
      credentials: "omit",
      body: email,
    })
      .then((res) => {
        if (!res.ok) return Promise.reject();
      })
      .then(() => {
        setStatus("complete");
        track("submit", "subscribe", "complete");
      })
      .catch(() => {
        track("submit", "subscribe", "error");
        setStatus("error");
      });
  };
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    send();
  };

  const handleRetry: MouseEventHandler = (e) => {
    e.preventDefault();
    setStatus("idle");
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setEmail(e.target.value);

  if (status === "error") {
    return (
      <div className={styles.error}>
        <p>Oh, there was an error :(</p>

        <p>
          <button className={styles.retryButton} onClick={handleRetry}>
            try again
          </button>{" "}
          or message me at hello [at] sonnet.io
        </p>
      </div>
    );
  }

  if (status === "complete") {
    return <div className={styles.done}>Thanks! Have this bee: 🐝</div>;
  }

  return (
    <form
      className={`${styles.subscribe} ${
        status === "active" ? styles.subscribeActive : ""
      }`}
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        placeholder="name@potato.horse"
        value={email}
        className={styles.input}
        onChange={handleInputChange}
      />
      <button className={styles.submitButton} type="submit" disabled={!isValid}>
        Save
      </button>
    </form>
  );
};
