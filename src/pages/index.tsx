import { useEffect, useState } from "react";
import Router from "next/router";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "../lib/initSupabase";
import { useAuth } from "../contexts/AuthContext";
import { ResetPassword } from "../components/ResetPassword";
import styles from "../styles/home.module.scss";
import { BgWhite } from "../components/BgWhite";

export default function Dashboard() {
  const [showResetPass, setShowResetPass] = useState(false);
  const [messageRedirect, setMessageRedirect] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setShowResetPass(true);
      if (event === "USER_UPDATED") {
        setMessageRedirect(true);
        setTimeout(() => {
          setShowResetPass(false);
          setMessageRedirect(false);
          Router.push("/");
        }, 2000);
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  if (!user) {
    return (
      <div style={{ width: "300px" }}>
        <h2 style={{ marginBottom: "1.5rem" }}>
          Necessário estar logado para acessar essa página
        </h2>
        <Link href="/login">
          <a
            style={{
              fontWeight: "bold",
              textDecoration: "underline",
              color: "#9b9e00",
            }}
          >
            Logar aqui
          </a>
        </Link>
      </div>
    );
  }

  return (
    <>
      {showResetPass ? (
        <>
          <ResetPassword />
          {messageRedirect && (
            <p style={{ marginTop: "1rem" }}>
              Redirecionando para o Dashboard..
            </p>
          )}
        </>
      ) : (
        <>
          <nav className={styles.statisticsContainer}>
            <Link href="/despesas">
              <a className={styles.statisticsWrapper}>
                <div>
                  <h1>R$ 7.892,00</h1>
                  <p>Receita Estimada/mês</p>
                </div>
                <Image
                  width="90"
                  height="90"
                  src="/icons/receitaDash.svg"
                  alt="Icone de moeda"
                />
              </a>
            </Link>
            <Link href="/alunos">
              <a className={styles.statisticsWrapper}>
                <div>
                  <h1>247</h1>
                  <p>Alunos</p>
                </div>
                <Image
                  width="90"
                  height="67.5"
                  src="/icons/alunosDash.svg"
                  alt="Icone de moeda"
                />
              </a>
            </Link>
            <Link href="/aulas">
              <a className={styles.statisticsWrapper}>
                <div>
                  <h1>27</h1>
                  <p>Aulas</p>
                </div>
                <Image
                  width="90"
                  height="82.5"
                  src="/icons/aulasDash.svg"
                  alt="Icone de moeda"
                />
              </a>
            </Link>
            <Link href="/planos">
              <a className={styles.statisticsWrapper}>
                <div>
                  <h1>05</h1>
                  <p>Planos</p>
                </div>
                <Image
                  width="90"
                  height="100"
                  src="/icons/planosDash.svg"
                  alt="Icone de moeda"
                />
              </a>
            </Link>
          </nav>

          <section className={styles.dashboardContainer}>
            <div className={styles.chartContainer}>
              <BgWhite>
                <h2>Receita/mês</h2>
                <hr />
              </BgWhite>
              <BgWhite>
                <h2>Gênero dos Alunos</h2>
                <hr />
              </BgWhite>
            </div>

            <div className={styles.tableContainer}>
              <BgWhite>
                <div className={styles.headerFirstTable}>
                  <h2>Últimos Alunos Cadastrados</h2>
                  <div>
                    <button className={styles.next} disabled>
                      {"<"} Anterior
                    </button>
                    <button className={styles.prev}>Próxima {">"}</button>
                  </div>
                </div>
                <hr />
                <table className={styles.tableFirst}>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Gênero</th>
                      <th>Plano</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>João Fernando Brígido</td>
                      <td>joao@hotmail.com</td>
                      <td>Masculino</td>
                      <td>Mensal</td>
                    </tr>
                    <tr>
                      <td>João Fernando Brígido</td>
                      <td>joao@hotmail.com</td>
                      <td>Masculino</td>
                      <td>Mensal</td>
                    </tr>
                    <tr>
                      <td>João Fernando Brígido</td>
                      <td>joao@hotmail.com</td>
                      <td>Masculino</td>
                      <td>Mensal</td>
                    </tr>
                    <tr>
                      <td>João Fernando Brígido</td>
                      <td>joao@hotmail.com</td>
                      <td>Masculino</td>
                      <td>Mensal</td>
                    </tr>
                    <tr>
                      <td>João Fernando Brígido</td>
                      <td>joao@hotmail.com</td>
                      <td>Masculino</td>
                      <td>Mensal</td>
                    </tr>
                    <tr>
                      <td>João Fernando Brígido</td>
                      <td>joao@hotmail.com</td>
                      <td>Masculino</td>
                      <td>Mensal</td>
                    </tr>
                    <tr>
                      <td>João Fernando Brígido</td>
                      <td>joao@hotmail.com</td>
                      <td>Masculino</td>
                      <td>Mensal</td>
                    </tr>
                  </tbody>
                </table>
              </BgWhite>
              <BgWhite>
                <h2>Últimas Aulas Cadastradas</h2>
                <hr />
                <div className={styles.tableSecondWrapper}>
                  <table className={styles.tableSecond}>
                    <tbody>
                      <tr>
                        <td>Inglês - 2° ano</td>
                      </tr>
                      <tr>
                        <td>Português - 1° ano</td>
                      </tr>
                      <tr>
                        <td>Matemática Aplicada</td>
                      </tr>
                      <tr>
                        <td>Teoria dos Grafos</td>
                      </tr>
                      <tr>
                        <td>Compiladores</td>
                      </tr>
                      <tr>
                        <td>UI/UX Design</td>
                      </tr>
                      <tr>
                        <td>Linguagem de Programação ll</td>
                      </tr>
                      <tr>
                        <td>Inglês - 2° ano</td>
                      </tr>
                      <tr>
                        <td>Português - 1° ano</td>
                      </tr>
                      <tr>
                        <td>Matemática Aplicada</td>
                      </tr>
                      <tr>
                        <td>Teoria dos Grafos</td>
                      </tr>
                      <tr>
                        <td>Compiladores</td>
                      </tr>
                      <tr>
                        <td>UI/UX Design</td>
                      </tr>
                      <tr>
                        <td>Linguagem de Programação ll</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </BgWhite>
            </div>
          </section>
        </>
      )}
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { user } = await supabase.auth.api.getUserByCookie(ctx.req);

//   if (!user) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };
