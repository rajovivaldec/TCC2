import styles from "./styles.module.scss";

export const Button = ({ children, black = false }, props) => {
  return (
    <button
      className={black ? `${styles.buttonBlack}` : `${styles.button}`}
      {...props}
    >
      {children}
    </button>
  );
};
