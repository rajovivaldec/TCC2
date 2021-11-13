import { useEffect, useState } from "react";
import Router from "next/router";
import { BgWhite } from "../../components/BgWhite";
import { Button } from "../../components/Button";
import { supabase } from "../../lib/initSupabase";
import { Input } from "../../components/Input";
import { useForm } from "../../hooks/useForm";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";

export default function MinhaConta() {
  const name = useForm();
  const email = useForm("email");
  const password = useForm("password");
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (user && password.validate()) {
      const { error } = await supabase.auth.update({
        password: password.value,
        email: email.value,
      });
      if (error) setError(error.message);

      setLoading(false);
      toast.success("Dados Alterados com Sucesso!");
    } else {
      toast.error("Preencha Todos os dados Corretamente!");
      setLoading(false);
    }

    upsertName();
  }

  useEffect(() => {
    if (user) email.setValue(user.email);
    selectName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function upsertName() {
    if (user && name.validate()) {
      let { data } = await supabase
        .from("nomes_usuarios")
        .select("nome")
        .eq("user_id", user.id)
        .single();

      if (data) {
        updateName(data);
      } else {
        const { data, error } = await supabase
          .from("nomes_usuarios")
          .insert({ nome: name.value, user_id: user.id })
          .single();

        if (error) setError(error.message);
        name.setValue(data.nome);
      }
    } else {
      alert("Necessário preencher os campos corretamente");
    }
  }

  async function selectName() {
    if (user) {
      let { data, error } = await supabase
        .from("nomes_usuarios")
        .select("nome")
        .eq("user_id", user.id)
        .single();

      if (error && name.value) setError(error.message);

      if (data) {
        name.setValue(data.nome);
      } else {
        name.setValue("");
      }
    }
  }

  async function updateName(nameUser) {
    if (nameUser) {
      const { data, error } = await supabase
        .from("nomes_usuarios")
        .update({ nome: name.value })
        .eq("user_id", user.id)
        .single();

      if (error) setError(error.message);
      name.setValue(data.nome);
    }
  }

  return (
    <>
      <section className={styles.container}>
        <h1>Minha Conta</h1>
        <BgWhite>
          <form onSubmit={handleSubmit}>
            <div className={styles.accountWrapper}>
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
                <Input
                  label="E-mail"
                  type="text"
                  id="email"
                  placeholder="Seu email"
                  required
                  {...email}
                />
              </div>
              <div>
                <Input
                  label="Senha"
                  type="password"
                  id="senha"
                  placeholder="Sua senha"
                  required
                  {...password}
                />
              </div>
            </div>
            <div className={styles.btnSave}>
              {loading ? (
                <Button isLoading disabled>
                  Salvando...
                </Button>
              ) : (
                <Button>Salvar</Button>
              )}
            </div>
          </form>
        </BgWhite>
      </section>
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
