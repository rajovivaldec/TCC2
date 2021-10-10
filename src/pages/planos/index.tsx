import { useState } from "react";
import Image from "next/image";
import { supabase } from "../../lib/initSupabase";
import { BgWhite } from "../../components/BgWhite";
import { Button } from "../../components/Button";
import { InputSearch } from "../../components/InputSearch";
import { useVisibleContent } from "../../hooks/useVisibleContent";
import { Input } from "../../components/Input";
import { useForm } from "../../hooks/useForm";
import { Select } from "../../components/Select";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./styles.module.scss";

type Plan = {
  id?: number;
  nome: string;
  preco: number | string;
  periodo: string;
};

type PlansProps = {
  data: Plan[];
};

export default function Planos(plans: PlansProps) {
  const name = useForm();
  const price = useForm();
  const [selectPeriod, setSelectPeriod] = useState("");
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [plansArray, setPlansArray] = useState(plans.data);
  const [planEdit, setPlanEdit] = useState(null);
  const [planDeleteId, setPlanDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const {
    homeVisible,
    editVisible,
    registerVisible,
    showHome,
    showRegister,
    showEdit,
  } = useVisibleContent();

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

  async function submitPlan(e) {
    e.preventDefault();
    setLoading(true);

    if (name.validate() && price.validate() && selectPeriod) {
      if (editVisible && planEdit) {
        updatePlan();
      } else {
        const { data, error } = await supabase
          .from("planos")
          .insert({
            nome: name.value,
            preco: price.value,
            periodo: selectPeriod,
            user_id: user.id,
          })
          .single();

        if (error) setError(error.message);

        const newPlan = {
          nome: data.nome,
          preco: data.preco,
          periodo: data.periodo,
        };
        setPlansArray([...plansArray, newPlan]);
        alert("Plano Cadastrado com Sucesso!");
        name.setValue("");
        price.setValue("");
        setSelectPeriod("");
        setLoading(false);
        location.reload();
      }
    } else {
      alert("Necessário preencher corretamente todos os campos!");
      setLoading(false);
    }
  }

  function handleEdit(plan) {
    showEdit();
    setPlanEdit(plan);
    name.setValue(plan.nome);
    price.setValue(plan.preco);
    setSelectPeriod(plan.periodo);
  }

  async function updatePlan() {
    const { error } = await supabase
      .from("planos")
      .update({
        nome: name.value,
        preco: price.value,
        periodo: selectPeriod,
      })
      .eq("id", planEdit.id)
      .single();

    if (error) setError(error.message);

    let updatedPlan = plansArray;
    let planIndex = plansArray.findIndex((item) => item.id === planEdit.id);
    updatedPlan[planIndex].nome = name.value;
    updatedPlan[planIndex].preco = price.value;
    updatedPlan[planIndex].periodo = selectPeriod;

    alert("Plano atualizado!");
    setPlansArray(updatedPlan);
    setPlanEdit(null);
    setLoading(false);
  }

  function handleDelete(id) {
    setPlanDeleteId(id);
    setShowModal(true);
  }

  async function deletePlan() {
    const { error } = await supabase
      .from("planos")
      .update({ excluido: true })
      .eq("id", planDeleteId);

    if (error) setError(error.message);

    let deletedPlan = plansArray.filter((item) => item.id !== planDeleteId);
    setPlansArray(deletedPlan);
    setShowModal(false);
    setPlanDeleteId(null);
  }

  function registerNewPlanBtn() {
    showRegister();
    name.setValue("");
    price.setValue("");
    setSelectPeriod("");
  }

  function handleOutsideClick(e) {
    if (e.target.id === "modal") setShowModal(false);
  }

  return (
    <>
      {homeVisible ? (
        <section className={styles.container}>
          <h1>Planos</h1>
          <BgWhite>
            <header>
              <Button onClick={registerNewPlanBtn}>Cadastrar Novo Plano</Button>
              <InputSearch
                onSubmit={() => console.log("test")}
                placeHolder="Buscar Planos..."
              />
            </header>

            <hr />

            <div className="tableContainer">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Período</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {plansArray.map((plan) => (
                    <tr key={plan.id}>
                      <td>{plan.nome}</td>
                      <td>{plan.preco}</td>
                      <td>{plan.periodo}</td>
                      <td>
                        <button onClick={() => handleEdit(plan)}>
                          <Image
                            width="24"
                            height="24"
                            src="/icons/editTable.svg"
                            alt="Editar"
                          />
                        </button>
                        <button onClick={() => handleDelete(plan.id)}>
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

          {showModal && (
            <div className="modal" id="modal" onClick={handleOutsideClick}>
              <div className="modalWrapper animeUp">
                <h3>Deseja Excluir o Plano?</h3>
                <p>Após excluido um item não é possível restaurá-lo</p>

                <div className="btns">
                  <button onClick={deletePlan}>Confirmar</button>
                  <button onClick={() => setShowModal(false)}>Cancelar</button>
                </div>
              </div>
            </div>
          )}
        </section>
      ) : registerVisible || editVisible ? (
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

            {error && <p>{error}</p>}

            <form onSubmit={submitPlan}>
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
                {registerVisible ? (
                  loading ? (
                    <Button isLoading disabled>
                      Cadastrando...
                    </Button>
                  ) : (
                    <Button>Cadastrar</Button>
                  )
                ) : editVisible ? (
                  loading ? (
                    <Button isLoading disabled>
                      Atualizando
                    </Button>
                  ) : (
                    <Button name="update" value="Update">
                      Salvar
                    </Button>
                  )
                ) : null}
              </div>
            </form>
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

  let { data: plans } = await supabase
    .from("planos")
    .select("id,nome,preco,periodo")
    .filter("excluido", "eq", "false")
    .eq("user_id", user.id);

  return {
    props: { data: plans },
  };
};
