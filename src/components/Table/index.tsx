import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";

const Row = ({ item }) => {
  const keys = Object.keys(item);
  return (
    <tr>
      {keys.map((key, idx) => (
        <td key={idx}>{item[key]}</td>
      ))}
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
};

const RowLink = ({ item }) => {
  const keys = Object.keys(item);
  return (
    <tr>
      {keys.map((key, idx) => (
        <td key={idx}>
          <Link href="/aulas/123">
            <a className={styles.link}>{item[key]}</a>
          </Link>
        </td>
      ))}
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
};

export const Table = ({ tHead, tBody, link = false }) => {
  return (
    <>
      {!link ? (
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
              {tBody.map((item, idx) => {
                return <Row key={idx} item={item} />;
              })}
            </tbody>
          </table>
        </div>
      ) : (
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
              {tBody.map((item, idx) => {
                return (
                  <RowLink
                    key={idx}
                    item={item}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
