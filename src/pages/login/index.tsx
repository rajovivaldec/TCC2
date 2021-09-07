import Image from "next/image";
import Router from "next/router";
import { useState } from "react";
import { Input } from "../../components/Input";
import { useForm } from "../../hooks/useForm";
import { useVisibleContent } from "../../hooks/useVisibleContent";
import { supabase } from "../../lib/initSupabase";
import styles from "./styles.module.scss";

function Login() {
  const email = useForm("email");
  const password = useForm("password");
  const name = useForm();
  const emailSignUp = useForm("email");
  const passwordSignUp = useForm("password");
  const emailResetPassword = useForm("email");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    homeVisible: loginVisible,
    editVisible: forgotPassVisible,
    registerVisible,
    showHome: showSignIn,
    showEdit: showForgotPass,
    showRegister: showSignUp,
  } = useVisibleContent();

  async function handleSubmitSignIn(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (email.validate() && password.validate()) {
      const { data, error: signInError } = await supabase.auth.signIn({
        email: email.value,
        password: password.value,
      });
      if (signInError) setError(signInError.message);

      setLoading(false);

      if (data) {
        Router.push("/");
      }
    } else {
      alert("Necessário preencher os campos Corretamente");
    }
  }

  async function handleSubmitSignUp(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (emailSignUp.validate() && passwordSignUp.validate()) {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: emailSignUp.value,
        password: passwordSignUp.value,
      });
      if (signUpError) setError(signUpError.message);

      setLoading(false);

      if (data) {
        setSuccess(true);
        name.setValue("");
        emailSignUp.setValue("");
        passwordSignUp.setValue("");
      }
    } else {
      alert("Necessário preencher os campos Corretamente");
    }
  }

  async function handleSubmitResetPass(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (emailResetPassword.validate()) {
      const { error } = await supabase.auth.api.resetPasswordForEmail(
        emailResetPassword.value
      );
      if (error) setError(error.message);
      else setSuccess(true);

      setLoading(false);
    } else {
      alert("Necessário preencher o campo Corretamente");
    }
  }

  return (
    <>
      {loginVisible ? (
        <main className={styles.containerSignIn}>
          <section className={styles.left}>
            <Image
              width="655.14"
              height="523.63"
              src="/imgs/loginIllustratios.svg"
              alt="Professor em frente a uma lousa"
            />
          </section>

          <section className={styles.right}>
            <div className={styles.createAccount}>
              <span>Não tem um conta?</span>
              <button onClick={showSignUp}>Criar Conta</button>
            </div>

            <div className={`${styles.rightContent} animeLeft`}>
              <h1>Bem Vindo de volta!</h1>
              <span>Faça o Login com suas credenciais</span>
              {error && (
                <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
              )}

              <form className={styles.form} onSubmit={handleSubmitSignIn}>
                <Input
                  label="E-mail"
                  type="text"
                  id="email"
                  placeholder="Insira seu e-mail"
                  required
                  {...email}
                />
                <div>
                  <Input
                    label="Senha"
                    type="password"
                    id="password"
                    placeholder="Insira sua senha"
                    required
                    {...password}
                  />
                </div>
                <div className={styles.btnsWrapper}>
                  {loading ? (
                    <button disabled>Entrando...</button>
                  ) : (
                    <button>Entrar</button>
                  )}
                  <div onClick={showForgotPass}>Esqueceu a senha?</div>
                </div>
              </form>
            </div>
          </section>
        </main>
      ) : registerVisible ? (
        <section className={styles.containerSignUp}>
          <section className={styles.left}>
            <Image
              width="658.16"
              height="493.65"
              src="/imgs/createIllustration.svg"
              alt="Pessoa olhando para um gráfico e estatísticas"
            />
          </section>

          <section className={styles.right}>
            <div className={styles.haveAccount}>
              <span> Já tem uma conta </span>
              <button onClick={showSignIn}>Entrar</button>
            </div>
            <div className={`${styles.rightContent} animeLeft`}>
              <h1>Bem Vindo ao Rajovi-Platform</h1>
              <span>Crie já sua conta</span>
              {error && (
                <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
              )}
              {success && (
                <p style={{ color: "green", marginBottom: "1rem" }}>
                  Conta criada com Sucesso!
                </p>
              )}

              <form
                className={styles.registerForm}
                onSubmit={handleSubmitSignUp}
              >
                <Input
                  label="Nome Completo"
                  type="text"
                  id="name"
                  placeholder="Insira seu nome completo"
                  required
                  {...name}
                />
                <div>
                  <Input
                    label="E-mail"
                    type="text"
                    id="email"
                    placeholder="Insira seu e-mail"
                    required
                    {...emailSignUp}
                  />
                </div>
                <div>
                  <Input
                    label="Senha"
                    type="password"
                    id="password"
                    placeholder="Insira sua senha"
                    required
                    {...passwordSignUp}
                  />
                </div>
                <div className={styles.registerBtn}>
                  {loading ? (
                    <button disabled>Criando...</button>
                  ) : (
                    <button>Criar Conta</button>
                  )}
                </div>
              </form>
            </div>
          </section>
        </section>
      ) : forgotPassVisible ? (
        <section className={styles.containerSignIn}>
          <section className={styles.left}>
            <Image
              width="612"
              height="453"
              src="/imgs/resgatarSenhaIllustration.svg"
              alt="Pessoa pensativa"
            />
          </section>

          <section className={styles.right}>
            <div className={`${styles.rightContent} animeLeft`}>
              <button className={styles.arrow} onClick={showSignIn}>
                <Image
                  width="39.06"
                  height="26.05"
                  src="/icons/setaVoltar.svg"
                  alt="Voltar para login"
                />
              </button>

              <h1>Esqueceu a senha?</h1>
              <span>
                Insira seu e-mail para receber as instruções de como alterar sua
                senha
              </span>
              {error && (
                <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
              )}
              {!error && success && (
                <p style={{ color: "green", marginBottom: "1rem" }}>
                  Cheque seu e-mail para resetar a senha
                </p>
              )}

              <form className={styles.form} onSubmit={handleSubmitResetPass}>
                <Input
                  label="E-mail"
                  type="text"
                  id="email"
                  placeholder="Insira seu e-mail"
                  required
                  {...emailResetPassword}
                />

                {loading ? (
                  <button className={styles.btnForgetPass} disabled>
                    Enviando...
                  </button>
                ) : (
                  <button className={styles.btnForgetPass}>
                    Enviar E-mail
                  </button>
                )}
              </form>
            </div>
          </section>
        </section>
      ) : null}
    </>
  );
}

function UpdatePassword({ supabase }) {
  const password = useForm("password");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (password.validate()) {
      const { error } = await supabase.auth.update({
        password: password.value,
      });
      if (error) setError(error.message);
      else setMessage("Sua senha foi redefinada com sucesso!");
    } else {
      alert("Necessário preencher o campo Corretamente");
    }

    setLoading(false);
  };

  return (
    <>
      {loading && <p>Carregando...</p>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {message && <div style={{ color: "green" }}>{message}</div>}
      <h2 style={{ marginBottom: "2rem" }}>Entre com uma nova senha</h2>
      <form onSubmit={handlePasswordReset}>
        <label htmlFor="newpassword">Nova Senha</label>
        <input
          style={{ marginTop: "0.5rem", padding: ".5rem 1rem" }}
          placeholder="+6 caracteres"
          type="password"
          onChange={(e) => password.setValue(e.target.value)}
        />
        <button
          style={{
            marginTop: "2rem",
            backgroundColor: "var(--yellow-main)",
            border: "none",
            padding: "1rem",
            fontWeight: "bold",
            borderRadius: "4px",
          }}
        >
          Mudar Senha
        </button>
      </form>
    </>
  );
}

Login.UpdatePassword = UpdatePassword;
export default Login;
