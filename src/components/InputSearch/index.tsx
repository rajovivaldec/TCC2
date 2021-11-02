import Image from "next/image";
import styles from "./styles.module.scss";

export const InputSearch = ({ onSubmit, placeHolder, ...props }) => {
  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <input type="text" {...props} placeholder={placeHolder} />
      <button>
        <Image
          width="21.5"
          height="21.5"
          src="/icons/lupaFiltro.svg"
          alt="Buscar"
        />
      </button>
    </form>
  );
};
