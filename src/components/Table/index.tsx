import styles from "./styles.module.scss";
import Image from "next/image";

export const Table = ({ tHead, tBody }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {tHead.map((item) => {
              return <th key={item}>{item}</th>;
            })}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tBody.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.nome}</td>
                <td>{item.email}</td>
                <td>{item.celular}</td>
                <td>{item.genero}</td>
                <td>{item.idade}</td>
                <td>{item.plano}</td>
                <td>
                  <button>
                    <Image
                      width="24"
                      height="24"
                      src="/icons/editTable.svg"
                      alt="Editar"
                    />
                  </button>
                  <button>
                    <Image
                      width="24"
                      height="24"
                      src="/icons/deleteTable.svg"
                      alt="Excluir"
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
