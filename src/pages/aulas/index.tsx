import Image from "next/image";
import dynamic from "next/dynamic";
import { supabase } from "../../lib/initSupabase";
import { BgWhite } from "../../components/BgWhite";
import { Button } from "../../components/Button";
import { InputSearch } from "../../components/InputSearch";
import { useVisibleContent } from "../../hooks/useVisibleContent";
import { Input } from "../../components/Input";
import { useForm } from "../../hooks/useForm";
import "react-quill/dist/quill.snow.css";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./styles.module.scss";

type Resource = {
  id?: number;
  data: Date | string;
  desc: string;
  recurso: string;
};

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

export default function Aulas({ classes }) {
  const { user } = useAuth();
  const name = useForm();
  const classDate = useForm();
  const description = useForm();
  const [resources, setResources] = useState("");
  const [classesArray, setClassesArray] = useState(classes);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalAddContent, setShowModalAddContent] = useState(false);
  const [currentClass, setCurrentClass] = useState(null);
  const [resourcesArray, setResourcesArray] = useState<Resource[] | null>([]);
  const [editContent, setEditContent] = useState(null);
  const [classDeleteId, setClassDeleteId] = useState(null);

  const {
    homeVisible,
    registerVisible,
    editVisible,
    showHome,
    showRegister,
    showEdit,
  } = useVisibleContent();

  async function addClassName(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (name.validate()) {
      const { data, error } = await supabase
        .from("aulas")
        .insert({ nome: name.value, user_id: user.id })
        .single();

      if (error) setError(error.message);

      setCurrentClass(data);
      setLoading(false);
      alert("Aula Cadastrada com Sucesso!");
      location.reload();
      showRegister();
    } else {
      alert("Necessário preencher o campo corretamente");
      setLoading(false);
    }
  }

  function handleEdit(classe) {
    setCurrentClass(classe);
    name.setValue(classe.nome);
    setClassDeleteId(classe.id);
    showEdit();
  }

  function handleDelete(classId) {
    setShowModal(true);
    setClassDeleteId(classId);
  }

  async function deleteClass() {
    const { error } = await supabase
      .from("aulas")
      .update({ excluido: true })
      .eq("id", classDeleteId);

    if (error) setError(error.message);

    let deleteClass = classesArray.filter((item) => item.id !== classDeleteId);
    setClassesArray(deleteClass);
    setShowModal(false);
    setClassDeleteId(null);
    showHome();
  }

  function handleOutsideClick(e) {
    if (e.target.id === "modal") {
      setShowModal(false);
    }
  }

  function handleAddContent() {
    classDate.setValue("");
    description.setValue("");
    setResources("");
    setEditContent(null);
    setShowModalAddContent(true);
  }

  function handleRegisterClass() {
    showRegister();
    name.setValue("");
    setResourcesArray(null);
    setCurrentClass(null);
  }

  async function submitContent(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (classDate.validate() && description.validate()) {
      if (editContent) {
        updateContent();
      } else {
        const { data, error } = await supabase
          .from("conteudos")
          .insert({
            data: classDate.value,
            desc: description.value,
            recurso: resources,
            aula_conteudo: currentClass.id,
            user_id: user.id,
          })
          .single();

        if (error) setError(error.message);

        setResourcesArray([...resourcesArray, data]);
        setLoading(false);
        setShowModalAddContent(false);
      }
    } else {
      alert("Necessário preencher os campos obrigatórios!");
      setLoading(false);
    }
  }

  useEffect(() => {
    async function selectContent() {
      if (currentClass) {
        let { data, error } = await supabase
          .from("conteudos")
          .select("id,data,desc,recurso")
          .eq("user_id", user.id)
          .eq("aula_conteudo", currentClass.id);

        if (error) setError(error.message);

        setResourcesArray(data);
      }
    }
    selectContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentClass]);

  async function updateClassName() {
    setLoading(true);

    const { error } = await supabase
      .from("aulas")
      .update({
        nome: name.value,
      })
      .eq("id", currentClass.id)
      .single();

    if (error) setError(error.message);

    let updatedClassName = classesArray;
    let classNameIndex = classesArray.findIndex(
      (item) => item.id === currentClass.id
    );
    updatedClassName[classNameIndex].nome = name.value;

    alert("Plano atualizado!");
    setClassesArray(updatedClassName);
    setLoading(false);
  }

  function handleEditContent(content) {
    classDate.setValue(content.data);
    description.setValue(content.desc);
    setResources(content.recurso);
    setEditContent(content);
    setShowModalAddContent(true);
  }

  async function updateContent() {
    const { error } = await supabase
      .from("conteudos")
      .update({
        data: classDate.value,
        desc: description.value,
        recurso: resources,
      })
      .eq("id", editContent.id)
      .single();

    if (error) setError(error.message);

    let updatedContent = resourcesArray;
    let contentIndex = resourcesArray.findIndex(
      (item) => item.id === editContent.id
    );
    updatedContent[contentIndex].data = classDate.value;
    updatedContent[contentIndex].desc = description.value;
    updatedContent[contentIndex].recurso = resources;

    setResourcesArray(updatedContent);
    setEditContent(null);
    setLoading(false);
    setShowModalAddContent(false);
  }

  async function handleDeleteContent(contentId) {
    const { error } = await supabase
      .from("conteudos")
      .delete()
      .eq("id", contentId);

    if (error) setError(error.message);

    let deletedContent = resourcesArray.filter((item) => item.id !== contentId);
    setResourcesArray(deletedContent);
  }

  function handleBackBtn() {
    showHome();
    setCurrentClass(null);
  }

  return (
    <>
      {homeVisible ? (
        <section className={styles.container}>
          <h1>Aulas</h1>
          <BgWhite>
            <header>
              <Button onClick={handleRegisterClass}>Cadastrar Nova Aula</Button>
              <InputSearch
                onSubmit={() => console.log("test")}
                placeHolder="Buscar Aulas..."
              />
            </header>

            <hr />

            <div className="tableContainer">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {classesArray.map((classe) => (
                    <tr key={classe.id}>
                      <td>{classe.nome}</td>
                      <td>
                        <button onClick={() => handleEdit(classe)}>
                          <Image
                            width="24"
                            height="24"
                            src="/icons/editTable.svg"
                            alt="Editar"
                          />
                        </button>
                        <button onClick={() => handleDelete(classe.id)}>
                          <Image
                            width="24"
                            height="24"
                            src="/icons/deleteTable.svg"
                            alt="Excluir"
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </BgWhite>
        </section>
      ) : registerVisible || editVisible ? (
        <section className={styles.container}>
          <h1>Cadastrar Aula</h1>
          {error && <p>{error}</p>}
          <BgWhite>
            <button onClick={handleBackBtn} className="btnBack">
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

            <div className={styles.btnRegister}>
              {registerVisible ? (
                loading ? (
                  <Button isLoading disabled>
                    Cadastrando...
                  </Button>
                ) : (
                  <Button onClick={addClassName}>Cadastrar</Button>
                )
              ) : editVisible ? (
                loading ? (
                  <Button isLoading disabled>
                    Atualizando
                  </Button>
                ) : (
                  <div className="btnsEdit">
                    <Button onClick={updateClassName}>Salvar</Button>
                    <Button onClick={() => setShowModal(true)} black>
                      Excluir
                    </Button>
                  </div>
                )
              ) : null}
            </div>

            {currentClass && (
              <>
                <p className={styles.labelAddClasses}>Adicionar Conteúdo</p>

                <div className={styles.contentWrap}>
                  <ul>
                    {resourcesArray &&
                      resourcesArray.map((resource) => (
                        <li key={resource.id}>
                          <div className={styles.contentContent}>
                            <label>Data</label>
                            <p>
                              {new Date(resource.data).toLocaleDateString(
                                "pt-BR",
                                { timeZone: "UTC" }
                              )}
                            </p>
                          </div>
                          <div className={styles.contentContent}>
                            <label>Descrição</label>
                            <p>{resource.desc}</p>
                          </div>
                          <div className={styles.contentContent}>
                            <label>Recursos</label>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: resource.recurso,
                              }}
                              className={styles.resourcesDiv}
                            />
                          </div>
                          <div className={styles.btnsContent}>
                            <button onClick={() => handleEditContent(resource)}>
                              <Image
                                width="16"
                                height="16"
                                src="/icons/editTable.svg"
                                alt="Editar"
                              />
                            </button>
                            <button
                              onClick={() => handleDeleteContent(resource.id)}
                            >
                              X
                            </button>
                          </div>
                        </li>
                      ))}
                  </ul>

                  <button className={styles.btnAdd} onClick={handleAddContent}>
                    +
                  </button>

                  {showModalAddContent && (
                    <div
                      className="modal"
                      id="modal"
                      onClick={handleOutsideClick}
                    >
                      <div className={`${styles.modalWrapp} animeUp`}>
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

                        <div className={styles.btnsModalAddContent}>
                          <Button onClick={submitContent}>Confirmar</Button>
                          <Button
                            black
                            onClick={() => setShowModalAddContent(false)}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </BgWhite>
        </section>
      ) : null}

      {showModal && (
        <div className="modal" id="modal" onClick={handleOutsideClick}>
          <div className="modalWrapper animeUp">
            <h3>Deseja Excluir a Aula?</h3>
            <p>Após excluido um item não é possível restaurá-lo</p>

            <div className="btns">
              <button onClick={deleteClass}>Confirmar</button>
              <button onClick={() => setShowModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
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

  let { data: classes } = await supabase
    .from("aulas")
    .select("id,nome")
    .filter("excluido", "eq", "false")
    .eq("user_id", user.id)
    .order("id", { ascending: false });

  return {
    props: { classes },
  };
};
