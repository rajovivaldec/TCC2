import { BgWhite } from "../../components/BgWhite";
import { useVisibleContent } from "../../hooks/useVisibleContent";
import { Button } from "../../components/Button";
import { InputSearch } from "../../components/InputSearch";
import { Table } from "../../components/Table";
import Image from "next/image";
import styles from "./styles.module.scss";
import { Input } from "../../components/Input";
import { useForm } from "../../hooks/useForm";

export default function Despesas() {
  const name = useForm();
  const expense = useForm();

  const { homeVisible, editVisible, registerVisible, showHome, showRegister } =
    useVisibleContent();

  const tableHead = ["Nome", "Despesa"];
  const tableBody = [
    {
      nome: "Conta de luz",
      despesa: 150,
    },
    {
      nome: "Condomínio",
      despesa: 500,
    },
    {
      nome: "Internet",
      despesa: 90,
    },
    {
      nome: "Plano de celular",
      despesa: 60,
    },
  ];

  return (
    <>
      {homeVisible ? (
        <section className={styles.container}>
          <h1>Despesas</h1>
          <BgWhite>
            <header>
              <Button onClick={showRegister}>Cadastrar Despesas Fixas</Button>
              <InputSearch
                onSubmit={() => console.log("test")}
                placeHolder="Buscar Despesas.."
              />
            </header>

            <hr />

            <Table tHead={tableHead} tBody={tableBody} />
          </BgWhite>
        </section>
      ) : registerVisible ? (
        <section className={styles.container}>
          <h1>Cadastrar Despesa Fixa</h1>
          <BgWhite>
            <button onClick={showHome} className="btnBack">
              <Image
                width="40"
                height="26"
                src="/icons/setaVoltar.svg"
                alt="voltar"
              />
            </button>

            <hr />

            <div className={styles.registerWrapper}>
              <div>
                <Input
                  label="Nome"
                  type="text"
                  id="nome"
                  placeholder="Insira o nome da despesa"
                  required
                  {...name}
                />
              </div>
              <div>
                <Input
                  label="Valor da Despesa"
                  type="number"
                  id="despesa"
                  placeholder="Insira o valor da despesa"
                  required
                  {...expense}
                />
              </div>
            </div>
            <div className={styles.btnRegister}>
              <Button onClick={() => console.log("despesa")}>Cadastrar</Button>
            </div>
          </BgWhite>
        </section>
      ) : null}
    </>
  );
}
