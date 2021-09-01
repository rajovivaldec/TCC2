import styles from "./styles.module.scss";

export const Input = ({
  label,
  type,
  id,
  value,
  setValue,
  error,
  ...props
}) => {
  return (
    <>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        className={styles.input}
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
};
