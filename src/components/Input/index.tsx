import { createRef } from "react";
import InputMask from "react-input-mask";
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
  phoneNumber = false,
  cpf = false,
}) => {
  const ref = createRef();
  return (
    <>
      {phoneNumber ? (
        <>
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
          <InputMask
            ref={ref}
            mask="(99) 99999-9999"
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
      ) : cpf ? (
        <>
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
          <InputMask
            ref={ref}
            mask="999.999.999-99"
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
      ) : (
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
      )}
    </>
  );
};
