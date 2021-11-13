import { useEffect, useMemo, useState } from "react";
import { GetServerSideProps } from "next";
import Router from "next/router";
import Link from "next/link";
import Image from "next/image";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import { supabase } from "../lib/initSupabase";
import { useAuth } from "../contexts/AuthContext";
import { ResetPassword } from "../components/ResetPassword";
import { BgWhite } from "../components/BgWhite";
import { useChart } from "../hooks/useChart";
import { Button } from "../components/Button";
import styles from "../styles/home.module.scss";
import { toast } from "react-toastify";

export default function Dashboard({
  countStudents,
  countClasses,
  countPlans,
  nameClasses,
  studentsPlans,
  expenditure,
}) {
  const { user } = useAuth();
  const [showResetPass, setShowResetPass] = useState(false);
  const [messageRedirect, setMessageRedirect] = useState(false);
  const {
    dataDoughnut,
    optionsDoughnut,
    dataBar,
    optionsBar,
  } = useChart();
  const [initialRange, setInitialRange] = useState(0);
  const [finalRange, setFinalRange] = useState(6);
  const [lastStudents, setLastStudents] = useState([]);
  const [loadingLastStudents, setLoadingLastStudents] = useState(false);
  const [totalEstimatedRevenue, setTotalestimatedRevenue] = useState(0);
  const [studentPlansArr, setstudentPlansArr] = useState(studentsPlans || []);
  const [expenditureArr, setExpenditureArr] = useState(expenditure || []);
  const [nameClassesArr, setNameClassesArr] = useState(nameClasses || []);

  function estimatedRevenue() {
    if (user) {
      const totalPlans = studentPlansArr.map((item) =>
        item.planos.periodo === "1" ? item.planos.preco * 4 : item.planos.preco
      );
      const totalRevenue = totalPlans.reduce((acc, curr) => acc + curr, 0);
      const totalExpense = expenditureArr.reduce(
        (acc, item) => acc + item.valor,
        0
      );
      const estimatedRevenue = totalRevenue - totalExpense;
      setTotalestimatedRevenue(estimatedRevenue);
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => estimatedRevenue(), [studentsPlans, user]);

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

  function nextPage() {
    setInitialRange(initialRange + 7);
    setFinalRange(finalRange + 6);
  }

  function backPage() {
    setInitialRange(initialRange - 7);
    setFinalRange(finalRange - 6);

    if (initialRange <= 0) {
      setInitialRange(0);
      setFinalRange(6);
    }
  }

  useEffect(() => {
    async function fetchStudents() {
      setLoadingLastStudents(true);
      if (user) {
        const { data, error } = await supabase
          .from("alunos")
          .select(
            `id, nome, email, genero,
          planos (nome)`
          )
          .order("id", { ascending: false })
          .range(initialRange, finalRange)
          .filter("excluido", "eq", "false")
          .eq("user_id", user.id);

        if (error) toast.error(error.message);

        setLastStudents(data);
        setLoadingLastStudents(false);
      }
    }
    fetchStudents();
  }, [user, initialRange, finalRange]);

  if (
    countStudents === undefined ||
    countClasses === undefined ||
    countPlans === undefined
  ) {
    location.reload();
  }

  if (!user) {
    return (
      <section className={styles.landingpageContainer}>
        <header>
          <span>RJV</span>
          <div className={styles.social}>
            <Link href="#">
              <a>
                <Image
                  width="16"
                  height="16"
                  src="/icons/instagramIcon.svg"
                  alt="Icone de moeda"
                />
              </a>
            </Link>
            <Link href="#">
              <a>
                <Image
                  width="16"
                  height="16"
                  src="/icons/facebookIcon.svg"
                  alt="Icone de moeda"
                />
              </a>
            </Link>
            <Link href="#">
              <a>
                <Image
                  width="16"
                  height="16"
                  src="/icons/emailIcon.svg"
                  alt="Icone de moeda"
                />
              </a>
            </Link>
          </div>
        </header>

        <main className={styles.content}>
          <div className={styles.text}>
            <h1>
              Esqueça planilhas e tenha o <strong>Melhor Gerenciamento</strong>{" "}
              de seu trabalho como professor
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
              eaque ad voluptatum, alias odio cupiditate possimus impedit
              delectus iste molestiae, nesciunt tempora minima ullam aperiam
            </p>
            <Link href="/login">
              <a>
                <Button>Cadastrar-se</Button>
              </a>
            </Link>
          </div>

          <div className={styles.imgHero}>
            <Image
              width={678}
              height={490}
              src="/imgs/illustrationHero.svg"
              alt="Ilustração principal"
              objectFit="contain"
            />
          </div>
        </main>
      </section>
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
                  <h1>
                    R${" "}
                    {String(totalEstimatedRevenue.toFixed(2))
                      .padStart(2, "0")
                      .replace(".", ",")}
                  </h1>
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
                  <h1>{String(countStudents).padStart(2, "0")}</h1>
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
                  <h1>{String(countClasses).padStart(2, "0")}</h1>
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
                  <h1>{String(countPlans).padStart(2, "0")}</h1>
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
            <div className={styles.chartsContainer}>
              <BgWhite>
                <h2>Quantidade de Alunos por Planos</h2>
                <hr />

                <div className={styles.barChart}>
                  <Bar data={dataBar} options={optionsBar} />
                </div>
              </BgWhite>
              <BgWhite>
                <h2>Gênero dos Alunos</h2>
                <hr />

                <div className={styles.doughnutChart}>
                  <Doughnut data={dataDoughnut} options={optionsDoughnut} />
                </div>
              </BgWhite>
            </div>

            {/* <div className={styles.lineChartContainer}>
              <BgWhite>
                <h2>Receita/mês</h2>
                <hr />

                <div className={styles.lineChart}>
                  <Line data={dataLine} options={optionsLine} />
                </div>
              </BgWhite>
            </div> */}

            <div className={styles.tableContainer}>
              <BgWhite>
                <div className={styles.headerFirstTable}>
                  <h2>Últimos Alunos Cadastrados</h2>
                  <div>
                    <button
                      className={styles.next}
                      onClick={backPage}
                      disabled={initialRange <= 0}
                    >
                      {"<"} Anterior
                    </button>
                    <button
                      className={styles.prev}
                      onClick={nextPage}
                      disabled={finalRange >= lastStudents.length}
                    >
                      Próxima {">"}
                    </button>
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
                    {!loadingLastStudents ? (
                      !!lastStudents.length &&
                      lastStudents.map((student) => (
                        <tr key={student.id}>
                          <td>{student.nome}</td>
                          <td>{student.email}</td>
                          <td>
                            {String(student.genero)
                              .replace("1", "Feminino")
                              .replace("2", "Masculino")
                              .replace("3", "Outro")}
                          </td>
                          <td>{student.planos.nome}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td>Carregando...</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </BgWhite>
              <BgWhite>
                <h2>Últimas Aulas Cadastradas</h2>
                <hr />
                <div className={styles.tableSecondWrapper}>
                  <table className={styles.tableSecond}>
                    <tbody>
                      {!!nameClassesArr &&
                        nameClassesArr.map((classe) => (
                          <tr key={classe.id}>
                            <td>{classe.nome}</td>
                          </tr>
                        ))}
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { user } = await supabase.auth.api.getUserByCookie(ctx.req);

  if (!user) {
    return { props: {} };
  }

  const { data: studentsPlans, count: countStudents } = await supabase
    .from("alunos")
    .select("id, planos (preco, periodo)", { count: "exact" })
    .filter("excluido", "eq", "false")
    .eq("user_id", user.id);

  const { data: nameClasses, count: countClasses } = await supabase
    .from("aulas")
    .select("id, nome", { count: "exact" })
    .order("id", { ascending: false })
    .filter("excluido", "eq", "false")
    .eq("user_id", user.id);

  const { count: countPlans } = await supabase
    .from("planos")
    .select("*", { count: "exact" })
    .filter("excluido", "eq", "false")
    .eq("user_id", user.id);

  let { data: expenditure } = await supabase
    .from("despesas")
    .select("valor")
    .filter("excluido", "eq", "false")
    .eq("user_id", user.id);

  return {
    props: {
      countStudents,
      countClasses,
      countPlans,
      nameClasses,
      studentsPlans,
      expenditure,
    },
  };
};
