import Image from "next/image";
import { BgWhite } from "../../components/BgWhite";
import { Button } from "../../components/Button";
import { InputSearch } from "../../components/InputSearch";
import { Table } from "../../components/Table";
import { useVisibleContent } from "../../hooks/useVisibleContent";
import styles from "./styles.module.scss";
import { Input } from "../../components/Input";
import { useForm } from "../../hooks/useForm";

export default function Aulas() {
  const name = useForm();
  const classDate = useForm();
  const description = useForm();
  const resources = useForm();

  const { homeVisible, editVisible, registerVisible, showHome, showRegister } =
    useVisibleContent();

  const tableHead = ["Aulas", "Quantidade de Alunos", "Quantidade de Aulas"];
  const tableBody = [
    {
      disciplina: "Compiladores",
      qtdAlunos: 10,
      qtdAulas: 20,
    },
    {
      disciplina: "Teoria dos Grafos",
      qtdAlunos: 6,
      qtdAulas: 14,
    },
    {
      disciplina: "Inteligência Artificial",
      qtdAlunos: 14,
      qtdAulas: 22,
    },
    {
      disciplina: "Banco de Dados I",
      qtdAlunos: 27,
      qtdAulas: 19,
    },
  ];

  return (
    <>
      {homeVisible ? (
        <section className={styles.container}>
          <h1>Aulas</h1>
          <BgWhite>
            <header>
              <Button onClick={showRegister}>Cadastrar Nova Aula</Button>
              <InputSearch
                onSubmit={() => console.log("test")}
                placeHolder="Buscar Aulas..."
              />
            </header>

            <hr />

            <Table tHead={tableHead} tBody={tableBody} link/>
          </BgWhite>
        </section>
      ) : registerVisible ? (
        <section className={styles.container}>
          <h1>Cadastrar Aula</h1>
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
              <div className={styles.nameClasses}>
                <Input
                  label="Nome"
                  type="text"
                  id="nome"
                  placeholder="Insira o nome da aula"
                  required
                  {...name}
                />
              </div>

              <p className={styles.labelAddClasses}>Adicionar Conteúdo</p>

              <div>
                <Input
                  label="Data"
                  type="date"
                  id="data"
                  placeholder="Insira a data da aula"
                  required
                  {...classDate}
                />
              </div>
              <div>
                <Input
                  label="Descrição"
                  type="text"
                  id="descricao"
                  placeholder="Insira a descrição da aula"
                  required
                  {...description}
                />
              </div>
              <div className={styles.resources}>
                <Input
                  label="Recursos"
                  type="text"
                  id="recursos"
                  placeholder="Insira os recursos utilizados na aula"
                  required
                  {...resources}
                />
              </div>
              <button className={styles.btnAdd}>+</button>
            </div>
            <div className={styles.btnRegister}>
              <Button onClick={() => console.log("aula")}>Cadastrar</Button>
            </div>
          </BgWhite>
        </section>
      ) : null}
    </>
  );
}
