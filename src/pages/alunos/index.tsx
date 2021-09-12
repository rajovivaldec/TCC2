import { BgWhite } from "../../components/BgWhite";
import { Button } from "../../components/Button";
import { InputSearch } from "../../components/InputSearch";
import { Table } from "../../components/Table";
import styles from "./styles.module.scss";

export default function Alunos() {
  const tableHead = ["Nome", "E-mail", "Celular", "Gênero", "Idade", "Plano"];

  const tableBody = [
    {
      nome: "Rafael",
      email: "rafael@hotmail.com",
      celular: "99778-2536",
      genero: "Masculino",
      idade: 20,
      plano: "Mensal",
    },
    {
      nome: "Vitor",
      email: "vitor@hotmail.com",
      celular: "99778-2536",
      genero: "Masculino",
      idade: 22,
      plano: "Semanal",
    },
    {
      nome: "Julia",
      email: "julia@hotmail.com",
      celular: "99254-9806",
      genero: "Feminino",
      idade: 19,
      plano: "Semanal",
    },
    {
      nome: "João Fernando",
      email: "joao@hotmail.com",
      celular: "99687-1436",
      genero: "Masculino",
      idade: 21,
      plano: "Mensal",
    },
  ];

  return (
    <section className={styles.container}>
      <h1>Alunos</h1>
      <BgWhite>
        <header>
          <Button>Cadastrar Novo Aluno</Button>
          <InputSearch
            onSubmit={() => console.log("test")}
            placeHolder="Buscar Alunos.."
          />
        </header>

        <hr />

        <Table tHead={tableHead} tBody={tableBody} />
      </BgWhite>
    </section>
  );
}
