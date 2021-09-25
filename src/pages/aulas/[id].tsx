import { BgWhite } from "../../components/BgWhite";
import Link from "next/link";
import Image from "next/image";
import styles from "./class.module.scss";

export default function Class() {
  return (
    <section className={styles.classContainer}>
      <h1>Aula</h1>

      <BgWhite>
        <div className={styles.header}>
          <Link href="/aulas">
            <a>
              <Image
                width="40"
                height="26"
                src="/icons/setaVoltar.svg"
                alt="voltar"
              />
            </a>
          </Link>
          <h2>Compiladores</h2>
        </div>

        <hr />

        <table className={styles.classTable}>
          <thead>
            <tr>
              <th>Data</th>
              <th>Descrição</th>
              <th>Recursos</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>25/09/2021</td>
              <td>Apresentação da disciplina e Introdução à compilação</td>
              <td>
                <p>
                  <a href="#">Slide 1</a> - Introdução à Compilação
                </p>
                <p>
                  <a href="#">Texto complementar</a> - Como afinal chegamos no
                  que é efetivamente executado pela máquina?
                </p>
              </td>
            </tr>
            <tr>
              <td>25/09/2021</td>
              <td>Apresentação da disciplina e Introdução à compilação</td>
              <td>
                <p>
                  <a href="#">Slide 1</a> - Introdução à Compilação
                </p>
                <p>
                  <a href="#">Texto complementar</a> - Como afinal chegamos no
                  que é efetivamente executado pela máquina?
                </p>
              </td>
            </tr>
            <tr>
              <td>25/09/2021</td>
              <td>Apresentação da disciplina e Introdução à compilação</td>
              <td>
                <p>
                  <a href="#">Slide 1</a> - Introdução à Compilação
                </p>
                <p>
                  <a href="#">Texto complementar</a> - Como afinal chegamos no
                  que é efetivamente executado pela máquina?
                </p>
              </td>
            </tr>
            <tr>
              <td>25/09/2021</td>
              <td>Apresentação da disciplina e Introdução à compilação</td>
              <td>
                <p>
                  <a href="#">Slide 1</a> - Introdução à Compilação
                </p>
                <p>
                  <a href="#">Texto complementar</a> - Como afinal chegamos no
                  que é efetivamente executado pela máquina?
                </p>
              </td>
            </tr>
            <tr>
              <td>25/09/2021</td>
              <td>Apresentação da disciplina e Introdução à compilação</td>
              <td>
                <p>
                  <a href="#">Slide 1</a> - Introdução à Compilação
                </p>
                <p>
                  <a href="#">Texto complementar</a> - Como afinal chegamos no
                  que é efetivamente executado pela máquina?
                </p>
              </td>
            </tr>
            <tr>
              <td>25/09/2021</td>
              <td>Apresentação da disciplina e Introdução à compilação</td>
              <td>
                <p>
                  <a href="#">Slide 1</a> - Introdução à Compilação
                </p>
                <p>
                  <a href="#">Texto complementar</a> - Como afinal chegamos no
                  que é efetivamente executado pela máquina?
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </BgWhite>
    </section>
  );
}
