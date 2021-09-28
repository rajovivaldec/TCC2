import Image from "next/image";
import { useState } from "react";
import { supabase } from "../../lib/initSupabase";
import { BgWhite } from "../../components/BgWhite";
import { Button } from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import { InputSearch } from "../../components/InputSearch";
import { Select } from "../../components/Select";
import { Table } from "../../components/Table";
import { useVisibleContent } from "../../hooks/useVisibleContent";
import styles from "./styles.module.scss";
import { Input } from "../../components/Input";
import { useForm } from "../../hooks/useForm";

export default function Alunos() {
  const name = useForm();
  const email = useForm("email");
  const phoneNumber = useForm("celular");
  const age = useForm();
  const address = useForm();
  const cpf = useForm("cpf");

  const { homeVisible, editVisible, registerVisible, showHome, showRegister } =
    useVisibleContent();

  const [selectPlans, setSelectPlans] = useState("");
  const plans = [
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
      nome: "Anual",
    },
  ];

  const [selectGender, setSelectGender] = useState("");
  const genders = [
    {
      id: 1,
      nome: "Feminino",
    },
    {
      id: 2,
      nome: "Masculino",
    },
    {
      id: 3,
      nome: "Outro",
    },
  ];

  const [classes, setClasses] = useState([]);
  const availableClasses = [
    "Inglês 1",
    "Matemática 1",
    "Hardware 1",
    "Volteio 1",
    "Inglês 2",
    "Matemática 2",
    "Hardware 2",
    "Volteio 2",
  ];

  const tableHead = ["Nome", "E-mail", "Celular", "Gênero", "Idade", "Plano"];
  const tableBody = [
    {
      nome: "Rafael",
      email: "rafael@hotmail.com",
      celular: "99778-2536",
      genero: "Masculino",
      idade: 20,
      plano: "Hardware - 8x por mês",
    },
    {
      nome: "Vitor",
      email: "vitor@hotmail.com",
      celular: "99778-2536",
      genero: "Masculino",
      idade: 22,
      plano: "Matemática - 3x por semana",
    },
    {
      nome: "Monique",
      email: "monique@hotmail.com",
      celular: "99254-9806",
      genero: "Feminino",
      idade: 23,
      plano: "Inglês - 1x por semana",
    },
    {
      nome: "João Fernando",
      email: "joao@hotmail.com",
      celular: "99687-1436",
      genero: "Masculino",
      idade: 21,
      plano: "Volteio - 2x por mês",
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
                placeHolder="Buscar Alunos..."
              />
            </header>

            <hr />

            <Table tHead={tableHead} tBody={tableBody} />
          </BgWhite>
        </section>
      ) : registerVisible ? (
        <section className={styles.container}>
          <h1>Cadastrar Aluno</h1>
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
                  placeholder="Insira seu nome completo"
                  required
                  {...name}
                />
              </div>
              <div>
                <Select
                  label="Plano"
                  value={selectPlans}
                  setValue={setSelectPlans}
                  options={plans}
                  defaultValue="Selecione um plano"
                  id="plano"
                />
              </div>
              <div>
                <Input
                  label="E-mail"
                  type="email"
                  id="email"
                  placeholder="Insira seu e-mail"
                  required
                  {...email}
                />
              </div>
              <div>
                <Select
                  label="Gênero"
                  value={selectGender}
                  setValue={setSelectGender}
                  options={genders}
                  defaultValue="Selecione um gênero"
                  id="genero"
                />
              </div>
              <div>
                <Input
                  label="Celular"
                  type="text"
                  id="celular"
                  placeholder="Insira seu celular"
                  required
                  {...phoneNumber}
                />
              </div>
              <div>
                <Input
                  label="Idade"
                  type="number"
                  id="idade"
                  placeholder="Insira sua idade"
                  required
                  {...age}
                />
              </div>
              <div>
                <Input
                  label="Endereço"
                  type="text"
                  id="endereco"
                  placeholder="Insira seu endereço"
                  required
                  {...address}
                />
              </div>
              <div>
                <Input
                  label="CPF"
                  type="number"
                  id="cpf"
                  placeholder="Insira seu CPF"
                  required
                  {...cpf}
                />
              </div>
            </div>
            <label className={styles.aulas}>Aulas</label>
            <div className={styles.aulasWrapp}>
              <Checkbox
                itemsCheck={availableClasses}
                value={classes}
                setValue={setClasses}
              />
            </div>
            <div className={styles.btnRegister}>
              <Button onClick={() => console.log("aluno")}>Cadastrar</Button>
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
