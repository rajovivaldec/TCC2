import { FormEvent, useState } from "react";
import Image from "next/image";
import { BgWhite } from "../../components/BgWhite";
import { useVisibleContent } from "../../hooks/useVisibleContent";
import { supabase } from "../../lib/initSupabase";
import { Button } from "../../components/Button";
import { InputSearch } from "../../components/InputSearch";
import { Input } from "../../components/Input";
import { useForm } from "../../hooks/useForm";
import styles from "./styles.module.scss";
import { useAuth } from "../../contexts/AuthContext";

type Expense = {
  id?: number;
  nome: string;
  valor: number | string;
};

type ExpenseProps = {
  data: Expense[];
};

export default function Despesas(expenditure: ExpenseProps) {
  const name = useForm();
  const expense = useForm();
  const { user } = useAuth();
  const [expenseArray, setExpenseArray] = useState(expenditure.data);
  const [expenseEdit, setExpenseEdit] = useState(null);
  const [expenseDelete, setExpenseDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const {
    homeVisible,
    registerVisible,
    editVisible,
    showHome,
    showRegister,
    showEdit,
  } = useVisibleContent();

  async function submitExpense(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (name.validate() && expense.validate()) {
      if (expenseEdit) {
        updateExpensive();
      } else {
        const { data, error } = await supabase
          .from("despesas")
          .insert({
            nome: name.value,
            valor: expense.value,
            user_id: user.id,
          })
          .single();

        if (error) setError(error.message);

        const newExpense = {
          nome: data.nome,
          valor: data.valor,
        };
        setExpenseArray([...expenseArray, newExpense]);
        alert("Despesa Cadastrada com Sucesso!");
        name.setValue("");
        expense.setValue("");
        setLoading(false);
        location.reload();
      }
    } else {
      alert("Necessário preencher os campos corretamente");
    }
  }

  function handleEdit(expenseUp) {
    showEdit();
    setExpenseEdit(expenseUp);
    setExpenseDelete(expenseUp.id);
    name.setValue(expenseUp.nome);
    expense.setValue(expenseUp.valor);
  }

  async function updateExpensive() {
    const { error } = await supabase
      .from("despesas")
      .update({
        nome: name.value,
        valor: expense.value,
      })
      .eq("id", expenseEdit.id)
      .single();

    if (error) setError(error.message);

    let expensedPlan = expenseArray;
    let planIndex = expenseArray.findIndex(
      (item) => item.id === expenseEdit.id
    );
    expensedPlan[planIndex].nome = name.value;
    expensedPlan[planIndex].valor = expense.value;

    alert("Despesa atualizada!");
    setExpenseArray(expensedPlan);
    setExpenseEdit(null);
    setLoading(false);
    showHome();
  }

  function handleDelete(expenseId) {
    setExpenseDelete(expenseId);
    setShowModal(true);
  }

  async function deleteExpense() {
    const { error } = await supabase
      .from("despesas")
      .update({ excluido: true })
      .eq("id", expenseDelete);

    if (error) setError(error.message);

    let deletedExpense = expenseArray.filter(
      (item) => item.id !== expenseDelete
    );
    setExpenseArray(deletedExpense);
    setShowModal(false);
    setExpenseDelete(null);
    showHome();
  }

  function registerNewPlanBtn() {
    showRegister();
    setExpenseEdit(null);
    name.setValue("");
    expense.setValue("");
  }

  function handleOutsideClick(e) {
    if (e.target.id === "modal") setShowModal(false);
  }

  return (
    <>
      {homeVisible ? (
        <section className={styles.container}>
          <h1>Despesas</h1>
          <BgWhite>
            <header>
              <Button onClick={registerNewPlanBtn}>
                Cadastrar Despesas Fixas
              </Button>
              <InputSearch
                onSubmit={() => console.log("test")}
                placeHolder="Buscar Despesas.."
              />
            </header>

            <hr />

            <div className="tableContainer">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Despesa</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {expenseArray.map((expense) => (
                    <tr key={expense.id}>
                      <td>{expense.nome}</td>
                      <td>{expense.valor}</td>
                      <td>
                        <button onClick={() => handleEdit(expense)}>
                          <Image
                            width="24"
                            height="24"
                            src="/icons/editTable.svg"
                            alt="Editar"
                          />
                        </button>
                        <button onClick={() => handleDelete(expense.id)}>
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
          <h1>Cadastrar Despesa Fixa</h1>
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

            <div className={styles.registerWrapper}>
              <div>
                <Input
                  label="Nome"
                  type="text"
                  id="nome"
                  placeholder="Insira o nome da despesa"
                  required
                  {...name}
                />
              </div>
              <div>
                <Input
                  label="Valor da Despesa"
                  type="number"
                  id="despesa"
                  placeholder="Insira o valor da despesa"
                  required
                  {...expense}
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
                  <Button onClick={submitExpense}>Cadastrar</Button>
                )
              ) : editVisible ? (
                loading ? (
                  <Button isLoading disabled>
                    Atualizando
                  </Button>
                ) : (
                  <div className="btnsEdit">
                    <Button onClick={submitExpense}>Salvar</Button>
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
            <h3>Deseja Excluir a Despesa?</h3>
            <p>Após excluido um item não é possível restaurá-lo</p>

            <div className="btns">
              <button onClick={deleteExpense}>Confirmar</button>
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

  let { data } = await supabase
    .from("despesas")
    .select("id,nome,valor")
    .filter("excluido", "eq", "false")
    .eq("user_id", user.id);

  return {
    props: { data },
  };
};
