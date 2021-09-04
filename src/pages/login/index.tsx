import { useState } from "react";
import Image from "next/image";
import { Input } from "../../components/Input";

import styles from "./styles.module.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [emailSignUp, setEmailSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [resetPassword, setResetPassword] = useState("");

  return (
    <>
      {/* Login */}
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
            <button>Criar Conta</button>
          </div>

          <div className={styles.rightContent}>
            <h1>Bem Vindo de volta!</h1>
            <span>Faça o Login com suas credenciais</span>

            <form className={styles.form}>
              <Input
                label="E-mail"
                type="text"
                id="email"
                placeholder="Insira seu e-mail"
                value={email}
                setValue={setEmail}
                error={false}
                required
              />
              <div>
                <Input
                  label="Senha"
                  type="password"
                  id="password"
                  placeholder="Insira sua senha"
                  value={password}
                  setValue={setPassword}
                  error={false}
                  required
                />
              </div>
              <div className={styles.btnsWrapper}>
                <button>Entrar</button>
                <button>Esqueceu a senha?</button>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* Registro */}
      {/* <section className={styles.containerSignUp}>
        <section className={styles.left}>
          <Image
            width="658.16"
            height="493.65"
            src="/imgs/createIllustration.svg"
            alt="Cara aleatorio"
          />
        </section>

        <section className={styles.right}>
          <div className={styles.haveAccount}>
            <span> Já tem uma conta </span>
            <button>ENTRAR</button>
          </div>
          <div className={styles.rightContent}>
            <h1>Bem Vindo ao Rajovi-Platform</h1>
            <span>Crie já sua conta</span>
            <form className={styles.registerForm}>
              <Input
                label="Nome Completo"
                type="text"
                id="name"
                placeholder="Insira seu nome completo"
                value={name}
                setValue={setName}
                error={false}
                required
              />
              <div>
                <Input
                  label="E-mail"
                  type="text"
                  id="email"
                  placeholder="Insira seu e-mail"
                  value={emailSignUp}
                  setValue={setEmailSignUp}
                  error={false}
                  required
                />
              </div>
              <div>
                <Input
                  label="Senha"
                  type="passowrd"
                  id="password"
                  placeholder="Insira sua senha"
                  value={passwordSignUp}
                  setValue={setPasswordSignUp}
                  error={false}
                  required
                />
              </div>
              <div className={styles.registerBtn}>
                <button>Criar Conta</button>
              </div>
            </form>
          </div>
        </section>
      </section> */}

      {/* Recuperar Senha */}
      {/* <section className={styles.containerSignIn}>
        <section className={styles.left}>
          <Image
            width="612"
            height="453"
            src="/imgs/resgatarSenhaIllustration.svg"
            alt="Pessoa pensativa"
          />
        </section>

        <section className={styles.right}>
          <div className={styles.rightContent}>
            <button className={styles.arrow}>
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

            <form className={styles.form}>
              <Input
                label="E-mail"
                type="text"
                id="email"
                placeholder="Insira seu e-mail"
                value={resetPassword}
                setValue={setResetPassword}
                error={false}
                required
              />
              <div className={styles.btnForgetPass}>
                <button>Enviar E-mail</button>
              </div>
            </form>
          </div>
        </section>
      </section> */}
    </>
  );
}
