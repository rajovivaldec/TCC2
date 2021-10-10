import styles from "./styles.module.scss";

export const Select = ({
  id,
  label,
  options,
  value,
  setValue,
  defaultValue,
}) => {
  return (
    <>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <select
        className={styles.select}
        id={id}
        value={value}
        onChange={({ target }) => setValue(target.value)}
      >
        <option disabled value="">
          {defaultValue}
        </option>
        {options.map((option, idx) => {
          return (
            <option value={option.nome} key={idx}>
              {option.nome}
            </option>
          );
        })}
      </select>
    </>
  );
};
