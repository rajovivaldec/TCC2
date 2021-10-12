import Image from "next/image";
import dynamic from "next/dynamic";
import { supabase } from "../../lib/initSupabase";
import { BgWhite } from "../../components/BgWhite";
import { Button } from "../../components/Button";
import { InputSearch } from "../../components/InputSearch";
import { Table } from "../../components/Table";
import { useVisibleContent } from "../../hooks/useVisibleContent";
import { Input } from "../../components/Input";
import { useForm } from "../../hooks/useForm";
import "react-quill/dist/quill.snow.css";
import styles from "./styles.module.scss";
import { useState } from "react";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => <p>Carregando...</p>,
});

const modules = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "indent",
  "link",
];

export default function Aulas() {
  const name = useForm();
  const classDate = useForm();
  const description = useForm();
  const [resources, setResources] = useState("");
  const [contentArray, setContentArray] = useState([]);

  const { homeVisible, editVisible, registerVisible, showHome, showRegister } =
    useVisibleContent();

  const tableHead = ["Aula", "Quantidade de Alunos", "Quantidade de Aulas"];
  const tableBody = [
    {
      disciplina: "Inglês",
      qtdAlunos: 10,
      qtdAulas: 20,
    },
    {
      disciplina: "Matemática",
      qtdAlunos: 6,
      qtdAulas: 14,
    },
    {
      disciplina: "Hardware",
      qtdAlunos: 14,
      qtdAulas: 22,
    },
    {
      disciplina: "Volteio",
      qtdAlunos: 27,
      qtdAulas: 19,
    },
  ];

  function handleAddContent() {
    if (classDate.validate() && description.validate()) {
      const newContent = {
        data: classDate.value,
        descricao: description.value,
        recurso: resources,
      };

      setContentArray([...contentArray, newContent]);
    } else {
      alert("Necessário preencher os campos corretamente");
    }
  }

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

            <Table tHead={tableHead} tBody={tableBody} link />
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

            <div className={styles.contentWrap}>
              <button className={styles.closeContent}>X</button>
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
                <QuillNoSSRWrapper
                  placeholder="Insira o Conteúdo da Aula"
                  theme="snow"
                  modules={modules}
                  formats={formats}
                  value={resources}
                  onChange={setResources}
                />
              </div>
              {contentArray.map((item, idx) => (
                <div key={idx} className={styles.contentWrap}>
                  <button className={styles.closeContent}>X</button>
                  <div>
                    <Input
                      label="Data"
                      type="date"
                      id="data"
                      placeholder="Insira a data da aula"
                      required
                      value={item.data}
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
                      value={item.descricao}
                      {...description}
                    />
                  </div>
                  <div className={styles.resources}>
                    <QuillNoSSRWrapper
                      placeholder="Insira o Conteúdo da Aula"
                      theme="snow"
                      modules={modules}
                      formats={formats}
                      value={item.recurso}
                      onChange={setResources}
                    />
                  </div>
                </div>
              ))}

              <button className={styles.btnAdd} onClick={handleAddContent}>
                +
              </button>
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
