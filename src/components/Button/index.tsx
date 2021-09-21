import { Loader } from "../Loader";
import styles from "./styles.module.scss";

export const Button = ({
  children,
  black = false,
  isLoading = false,
  ...props
}) => {
  return (
    <>
      {isLoading ? (
        <button
          className={
            black
              ? `${styles.buttonBlack} ${styles.loading}`
              : `${styles.button} ${styles.loading}`
          }
          {...props}
        >
          {children}
          <Loader />
        </button>
      ) : (
        <button
          className={black ? `${styles.buttonBlack}` : `${styles.button}`}
          {...props}
        >
          {children}
        </button>
      )}
    </>
  );
};
