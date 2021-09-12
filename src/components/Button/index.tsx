import styles from "./styles.module.scss";

export const Button = ({ children, black = false, onClick }) => {
  return (
    <button
      className={black ? `${styles.buttonBlack}` : `${styles.button}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
