import Image from "next/image";
import { BgWhite } from "../../components/BgWhite";
import { Button } from "../../components/Button";
import { InputSearch } from "../../components/InputSearch";
import { Table } from "../../components/Table";
import { useVisibleContent } from "../../hooks/useVisibleContent";
import styles from "./styles.module.scss";
import { Input } from "../../components/Input";
import { useForm } from "../../hooks/useForm";
import { Select } from "../../components/Select";
import { useState } from "react";

export default function Planos() {
  const name = useForm();
  const price = useForm();

  const { homeVisible, editVisible, registerVisible, showHome, showRegister } =
    useVisibleContent();

  const [selectPeriod, setSelectPeriod] = useState("");
  const periods = [
    {
      id: 1,
      nome: "Semanal",
    },
    {
      id: 2,
      nome: "Mensal",
    },
    {
      id: 3,
      nome: "Trimestral",
    },
    {
      id: 4,
      nome: "Semestral",
    },
    {
      id: 5,
      nome: "Anual",
    },
  ];

  const tableHead = ["Nome", "Preço", "Período"];
  const tableBody = [
    {
      nome: "Premium - Mensal",
      preco: 149.9,
      periodo: "Mensal",
    },
    {
      nome: "Premium - Anual",
      preco: 200,
      periodo: "Anual",
    },
    {
      nome: "Básico - Semanal",
      preco: 79.9,
      periodo: "Semanal",
    },
    {
      nome: "Básico - Diário",
      preco: 50,
      periodo: "Diário",
    },
  ];

  return (
    <>
      {homeVisible ? (
        <section className={styles.container}>
          <h1>Planos</h1>
          <BgWhite>
            <header>
              <Button onClick={showRegister}>Cadastrar Novo Plano</Button>
              <InputSearch
                onSubmit={() => console.log("test")}
                placeHolder="Buscar Planos..."
              />
            </header>

            <hr />

            <Table tHead={tableHead} tBody={tableBody} />
          </BgWhite>
        </section>
      ) : registerVisible ? (
        <section className={styles.container}>
          <h1>Cadastrar Plano</h1>
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
                  placeholder="Insira o nome do plano"
                  required
                  {...name}
                />
              </div>
              <div>
                <Input
                  label="Preço"
                  type="number"
                  id="preco"
                  placeholder="Insira o preço do plano"
                  required
                  {...price}
                />
              </div>
              <div>
                <Select
                  label="Período"
                  value={selectPeriod}
                  setValue={setSelectPeriod}
                  options={periods}
                  defaultValue="Selecione um período"
                  id="periodo"
                />
              </div>
            </div>
            <div className={styles.btnRegister}>
              <Button>Cadastrar</Button>
            </div>
          </BgWhite>
        </section>
      ) : null}
    </>
  );
}
