import styles from "./styles.module.scss";

export const BgWhite = ({ children, table = false }) => {
  return (
    <div
      className={
        table ? `${styles.container} ${styles.tableBg}` : styles.container
      }
    >
      {children}
    </div>
  );
};
