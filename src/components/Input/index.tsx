import styles from "./styles.module.scss";

export const Input = ({
  id,
  label,
  onChange,
  value,
  type,
  onBlur,
  placeholder,
  error,
  required,
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
        onChange={onChange}
        placeholder={placeholder}
        onBlur={onBlur}
        type={type}
        value={value}
        required={required}
      />
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
};
