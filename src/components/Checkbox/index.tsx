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
        <label key={item.id} className={styles.label}>
          {item.nome}
          <input
            type="Checkbox"
            value={String(item.id)}
            checked={value.includes(String(item.id))}
            onChange={handleChange}
          />
        </label>
      ))}
    </>
  );
};

export default Checkbox;
