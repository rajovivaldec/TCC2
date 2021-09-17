import Image from "next/image";
import { useState } from "react";
import { BgWhite } from "../../components/BgWhite";
import { Button } from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import { InputSearch } from "../../components/InputSearch";
import { Select } from "../../components/Select";
import { Table } from "../../components/Table";
import { useVisibleContent } from "../../hooks/useVisibleContent";
import styles from "./styles.module.scss";

export default function Alunos() {
  const { homeVisible, editVisible, registerVisible, showHome, showRegister } =
    useVisibleContent();

  const [selectPlans, setSelectPlans] = useState("");
  const planos = [
    {
      id: 1,
      nome: "Semanal",
    },
    {
      id: 2,
      nome: "Mênsal",
    },
    {
      id: 3,
      nome: "Anual",
    },
  ];

  const [aulas, setAulas] = useState([]);
  const aulasDisponiveis = [
    "Matemática1",
    "Português1",
    "História1",
    "Matemática2",
    "Português2",
    "História2",
    "Matemática3",
    "Português3",
    "História3",
  ];

  const tableHead = ["Nome", "Email", "Celular", "Gênero", "Idade", "Plano"];
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
    <>
      {homeVisible ? (
        <section className={styles.container}>
          <h1>Alunos</h1>
          <BgWhite>
            <header>
              <Button onClick={showRegister}>Cadastrar Novo Aluno</Button>
              <InputSearch
                onSubmit={() => console.log("test")}
                placeHolder="Buscar Alunos.."
              />
            </header>

            <hr />

            <Table tHead={tableHead} tBody={tableBody} />
          </BgWhite>
        </section>
      ) : registerVisible ? (
        <section className={styles.container}>
          <h1>Cadastrar Alunos</h1>
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

            <Select
              id="generos"
              label="Gênero"
              options={planos}
              value={selectPlans}
              setValue={setSelectPlans}
              defaultValue="Selecione um Gênero"
            />
            <br />
            <br />
            <h3>Aulas</h3>
            <div className={styles.aulasWrapp}>
              <Checkbox
                itemsCheck={aulasDisponiveis}
                value={aulas}
                setValue={setAulas}
              />
            </div>
          </BgWhite>
        </section>
      ) : null}
    </>
  );
}
