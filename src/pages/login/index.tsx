import { useState } from "react";
import Image from "next/image";
import { Input } from "../../components/Input";

import styles from "./styles.module.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
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
      {/* <main className={styles.containerSignUp}>
        <section className={styles.left}>
          <Image
            width="655.14"
            height="523.63"
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
                label="Nome Completo" //perguntar para o joão quanto ao value e setValue
                type="text"
                id="name"
                placeHolder="Insrira seu nome completo"
                // value ={name}
                error={false}
                required
              />
              <div>
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
              </div>
              <div>
                <Input
                  label="Senha"
                  type="passowrd"
                  id="password"
                  placeholder="Insira sua senha"
                  value={password}
                  setValue={setPassword}
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
      </main> */}
    </>
  );
}
