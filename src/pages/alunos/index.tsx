import Image from "next/image";
import React, { FormEvent, useMemo, useState } from "react";
import { supabase } from "../../lib/initSupabase";
import { BgWhite } from "../../components/BgWhite";
import { Button } from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import { InputSearch } from "../../components/InputSearch";
import { Select } from "../../components/Select";
import { useAuth } from "../../contexts/AuthContext";
import { useVisibleContent } from "../../hooks/useVisibleContent";
import { Input } from "../../components/Input";
import { useForm } from "../../hooks/useForm";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";

type Plans = {
  id: number;
  nome: string;
};

type Classes = {
  id: number;
  nome: string;
};

type Student = {
  id: number;
  nome: string;
  email: string;
  genero: number;
  celular: string;
  idade: number;
  endereco: string;
  cpf: string;
  aluno_plano: number;
  planos: {
    nome: string;
  };
};

type StudentProps = {
  plans: Plans[];
  classes: Classes[];
  students: Student[];
};

export default function Alunos({
  plans: dataPlans,
  classes: dataClasses,
  students: dataStudents,
}: StudentProps) {
  const name = useForm();
  const email = useForm("email");
  const phoneNumber = useForm("celular");
  const age = useForm();
  const address = useForm();
  const cpf = useForm("cpf");
  const [plans, setPlans] = useState(dataPlans || []);
  const [availableClasses, setAvailableClasses] = useState(dataClasses || []);
  const [classes, setClasses] = useState([]);
  const [selectPlans, setSelectPlans] = useState("");
  const [selectGender, setSelectGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [studentEdit, setStudentEdit] = useState(null);
  const [studentDeleteId, setStudentDeleteId] = useState(null);
  const [studentsArray, setStudentsArray] = useState<Student[]>(
    dataStudents || []
  );
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectClassesOld, setSelectClassesOld] = useState([]);
  const [search, setSearch] = useState("");

  const {
    homeVisible,
    editVisible,
    registerVisible,
    showHome,
    showEdit,
    showRegister,
  } = useVisibleContent();

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

  async function submitStudent(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (
      name.validate() &&
      selectPlans !== "" &&
      email.validate() &&
      classes.length &&
      selectGender !== ""
    ) {
      if (editVisible && studentEdit) {
        updateStudent();
      } else {
        const { data: aluno, error: aluno_erro } = await supabase
          .from("alunos")
          .insert({
            nome: name.value,
            email: email.value,
            genero: Number(selectGender),
            celular: phoneNumber.value,
            idade: age.value,
            endereco: address.value,
            cpf: cpf.value,
            aluno_plano: Number(selectPlans),
            user_id: user.id,
          })
          .single();

        if (aluno_erro) setError(aluno_erro.message);

        if (aluno) {
          const aluno_aula_insert = classes.map((classItem) => {
            return {
              aula_id: Number(classItem),
              aluno_id: aluno.id,
              user_id: user.id,
            };
          });

          const { data: aluno_aula, error: aluno_aula_erro } = await supabase
            .from("alunos_aulas")
            .insert(aluno_aula_insert);

          if (aluno_aula_erro) setError(aluno_aula_erro.message);

          toast.success("Aluno cadastrado com Sucesso!");
          setStudentsArray([...studentsArray, aluno]);
          clearInputs();
          setLoading(false);
          location.reload();
        }
      }
    } else {
      toast.error("Necessário preencher todos os campos corretamente!");
      setLoading(false);
    }
  }

  async function selectStudentClasses(studentId) {
    let { data: alunos_aulas } = await supabase
      .from("alunos_aulas")
      .select("aula_id")
      .eq("aluno_id", studentId)
      .eq("user_id", user.id);

    return alunos_aulas;
  }

  async function handleEdit(student: Student) {
    setStudentEdit(student);
    setStudentDeleteId(student.id);
    name.setValue(student.nome);
    setSelectPlans(String(student.aluno_plano));
    email.setValue(student.email);
    setSelectGender(String(student.genero));
    phoneNumber.setValue(student.celular);
    age.setValue(String(student.idade));
    address.setValue(student.endereco);
    cpf.setValue(student.cpf);

    const selectClasses = await selectStudentClasses(student.id);
    const selectClassesToString = selectClasses.map(({ aula_id }) =>
      aula_id.toString()
    );
    setClasses(selectClassesToString);
    setSelectClassesOld(selectClasses.map((item) => item.aula_id));
    showEdit();
  }

  async function updateStudent() {
    const selectCurrentClasses = classes.map((item) => {
      return {
        aula_id: Number(item),
        aluno_id: Number(studentEdit.id),
        user_id: user.id,
      };
    });

    const { data, error } = await supabase
      .from("alunos")
      .update({
        nome: name.value,
        email: email.value,
        genero: Number(selectGender),
        celular: phoneNumber.value,
        idade: age.value,
        endereco: address.value,
        cpf: cpf.value,
        aluno_plano: Number(selectPlans),
      })
      .eq("id", Number(studentEdit.id))
      .single();

    if (error) setError(error.message);

    const { data: deleteClass } = await supabase
      .from("alunos_aulas")
      .delete()
      .eq("aluno_id", Number(studentEdit.id))
      .eq("user_id", user.id)
      .in("aula_id", selectClassesOld);

    if (deleteClass) {
      const { data: aulaAtual, error: updatedClassError } = await supabase
        .from("alunos_aulas")
        .insert(selectCurrentClasses)
        .eq("aluno_id", Number(studentEdit.id))
        .eq("user_id", user.id);
    }

    toast.success("Plano atualizado!");
    setStudentEdit(null);
    setLoading(false);
    location.reload();
  }

  function handleDelete(studentId) {
    setStudentDeleteId(studentId);
    setShowModal(true);
  }

  async function deleteStudent() {
    const { data, error } = await supabase
      .from("alunos")
      .update({ excluido: true })
      .eq("id", studentDeleteId);

    if (error) setError(error.message);

    let deletedStudent = studentsArray.filter(
      (item) => item.id !== studentDeleteId
    );

    if (data) {
      const { error: alunoAulasError } = await supabase
        .from("alunos_aulas")
        .delete()
        .eq("aluno_id", studentDeleteId);
    }
    toast.success("Aluno Deletado!");
    setStudentsArray(deletedStudent);
    setShowModal(false);
    setStudentDeleteId(null);
    showHome();
  }

  function clearInputs() {
    name.setValue("");
    setSelectPlans("");
    email.setValue("");
    setSelectGender("");
    phoneNumber.setValue("");
    age.setValue("");
    address.setValue("");
    cpf.setValue("");
    setClasses([]);
  }

  function registerNewPlanBtn() {
    showRegister();
    clearInputs();
  }

  function handleOutsideClick(e) {
    if (e.target.id === "modal") setShowModal(false);
  }

  const studentsFiltered = useMemo(() => {
    const lowerSearch = search.toLocaleLowerCase();
    return studentsArray.filter((student) =>
      student.nome.toLocaleLowerCase().includes(lowerSearch)
    );
  }, [studentsArray, search]);

  return (
    <>
      {error && toast.error(error)}

      {homeVisible ? (
        <section className={styles.container}>
          <h1>Alunos</h1>
          <BgWhite table>
            <header>
              <Button onClick={registerNewPlanBtn}>Cadastrar Novo Aluno</Button>
              <InputSearch
                placeHolder="Buscar Alunos..."
                onSubmit={(e) => e.preventDefault()}
                value={search}
                onChange={({ target }) => setSearch(target.value)}
              />
            </header>

            <hr />

            <div className="tableContainer">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Celular</th>
                    <th>Gênero</th>
                    <th>Idade</th>
                    <th>Plano</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {studentsFiltered.map((student) => (
                    <tr key={student.id}>
                      <td>{student.nome}</td>
                      <td>{student.email}</td>
                      <td>{student.celular}</td>
                      <td>
                        {String(student.genero)
                          .replace("1", "Feminino")
                          .replace("2", "Masculino")
                          .replace("3", "Outro")}
                      </td>
                      <td>{student.idade}</td>
                      <td>{student.planos.nome}</td>
                      <td>
                        <button onClick={() => handleEdit(student)}>
                          <Image
                            width="24"
                            height="24"
                            src="/icons/editTable.svg"
                            alt="Editar"
                          />
                        </button>
                        <button onClick={() => handleDelete(student.id)}>
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
                  phoneNumber
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
                  type="text"
                  id="cpf"
                  placeholder="Insira seu CPF"
                  required
                  cpf
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
              {registerVisible ? (
                loading ? (
                  <Button isLoading disabled>
                    Cadastrando...
                  </Button>
                ) : (
                  <Button onClick={submitStudent}>Cadastrar</Button>
                )
              ) : editVisible ? (
                loading ? (
                  <Button isLoading disabled>
                    Atualizando
                  </Button>
                ) : (
                  <div className="btnsEdit">
                    <Button onClick={submitStudent}>Salvar</Button>
                    <Button onClick={() => setShowModal(true)} black>
                      Excluir
                    </Button>
                  </div>
                )
              ) : null}
            </div>
          </BgWhite>
        </section>
      ) : null}

      {showModal && (
        <div className="modal" id="modal" onClick={handleOutsideClick}>
          <div className="modalWrapper animeUp">
            <h3>Deseja Excluir o Plano?</h3>
            <p>Após excluido um item não é possível restaurá-lo</p>

            <div className="btns">
              <button onClick={deleteStudent}>Confirmar</button>
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

  let { data: plans } = await supabase
    .from("planos")
    .select("id,nome")
    .filter("excluido", "eq", "false")
    .eq("user_id", user.id);

  let { data: classes } = await supabase
    .from("aulas")
    .select("id,nome")
    .filter("excluido", "eq", "false")
    .eq("user_id", user.id);

  let { data: students } = await supabase
    .from("alunos")
    .select(
      `
    *,
    planos (
      nome
    )
  `
    )
    .filter("excluido", "eq", "false")
    .eq("user_id", user.id);

  return {
    props: { plans, classes, students },
  };
};
