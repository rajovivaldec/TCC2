import { BgWhite } from "../../components/BgWhite";
import { Button } from "../../components/Button";
import styles from "./styles.module.scss";
import { Input } from "../../components/Input";
import { useForm } from "../../hooks/useForm";

export default function MinhaConta() {
  const name = useForm();
  const email = useForm("email");
  const password = useForm("password");

  return (
    <>
      <section className={styles.container}>
        <h1>Minha Conta</h1>
        <BgWhite>
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
                placeholder="Insira seu e-mail"
                required
                {...email}
              />
            </div>
            <div>
              <Input
                label="Senha"
                type="password"
                id="senha"
                placeholder="Insira sua senha"
                required
                {...password}
              />
            </div>
          </div>
          <div className={styles.btnSave}>
            <Button onClick={() => console.log("salvar")}>Salvar</Button>
          </div>
        </BgWhite>
      </section>
    </>
  );
}
