import Image from "next/image";
import { supabase } from "../../lib/initSupabase";
import { BgWhite } from "../../components/BgWhite";
import { Button } from "../../components/Button";
import { InputSearch } from "../../components/InputSearch";
import { Table } from "../../components/Table";
import { useVisibleContent } from "../../hooks/useVisibleContent";
import { Input } from "../../components/Input";
import { useForm } from "../../hooks/useForm";
import { Select } from "../../components/Select";
import { useState } from "react";
import styles from "./styles.module.scss";

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
  ];

  const tableHead = ["Nome", "Preço", "Período"];
  const tableBody = [
    {
      nome: "Inglês - 1x por semana",
      preco: 30,
      periodo: "Semanal",
    },
    {
      nome: "Matemática - 3x por semana",
      preco: 75,
      periodo: "Semanal",
    },
    {
      nome: "Hardware - 8x por mês",
      preco: 220,
      periodo: "Mensal",
    },
    {
      nome: "Volteio - 2x por mês",
      preco: 65,
      periodo: "Mensal",
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

export const getServerSideProps = async (ctx) => {
  const { user } = await supabase.auth.api.getUserByCookie(ctx.req);

  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
