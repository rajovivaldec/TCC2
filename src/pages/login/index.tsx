import { useState } from "react";
import Image from "next/image";
import { Input } from "../../components/Input";

import styles from "./styles.module.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetPassword, setResetPassword] = useState("");

  return (
    <>
       <main className={styles.containerSignIn}>
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
            <Image
              width="39.06"
              height="26.05"
              src="/icons/setaVoltar.svg"
              alt="Voltar para login"
            />

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
      </main>

      {/* <main className={styles.containerSignIn}>
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
            <span>Não tem uma conta?</span>
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
      </main> */}
    </>
  );
}
