import styles from "./styles.module.scss";

const Checkbox = ({ itemsCheck, value, setValue }) => {
  function handleChange({ target }) {
    if (target.checked) {
      setValue([...value, target.value]);
    } else {
      setValue(value.filter((itemValue) => itemValue !== target.value));
    }
  }

  return (
    <>
      {itemsCheck.map((item) => (
        <label key={item} className={styles.label}>
          {item}
          <input
            type="Checkbox"
            value={item}
            checked={value.includes(item)}
            onChange={handleChange}
          />
        </label>
      ))}
    </>
  );
};

export default Checkbox;
