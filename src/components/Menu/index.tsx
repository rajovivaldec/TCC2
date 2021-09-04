import { useState } from "react";
import Image from "next/image";
import { ActiveLink } from "../ActiveLink";
import styles from "./styles.module.scss";

export const Menu = ({ toggleMenu, setToggleMenu }) => {
  function handleToggleMenu() {
    setToggleMenu(!toggleMenu);
  }

  return (
    <div
      className={`${styles.menuContainer} ${toggleMenu ? styles.mobile : ""}`}
    >
      <div className={styles.header}>
        <span>Olá João Fernando</span>
        <button
          className={styles.menuHamburger}
          onClick={handleToggleMenu}
        ></button>
      </div>

      <hr />

      {!toggleMenu ? (
        <nav className={styles.nav}>
          <ul>
            <li>
              <ActiveLink href="/" activeClassName={styles.active}>
                <a>
                  <Image
                    src="/icons/dashHeader.svg"
                    width="24"
                    height="22"
                    alt="Dashboard"
                  />
                  Dashboard
                </a>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/alunos" activeClassName={styles.active}>
                <a>
                  <Image
                    src="/icons/alunosHeader.svg"
                    width="24"
                    height="18"
                    alt="Alunos"
                  />
                  Alunos
                </a>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/aulas" activeClassName={styles.active}>
                <a>
                  <Image
                    src="/icons/aulasHeader.svg"
                    width="24"
                    height="22"
                    alt="Aulas"
                  />
                  Aulas
                </a>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/planos" activeClassName={styles.active}>
                <a>
                  <Image
                    src="/icons/planosHeader.svg"
                    width="24"
                    height="22"
                    alt="Planos"
                  />
                  Planos
                </a>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/despesas" activeClassName={styles.active}>
                <a>
                  <Image
                    src="/icons/despesaHeader.svg"
                    width="24"
                    height="20"
                    alt="Despesas"
                  />
                  Despesas
                </a>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/minha-conta" activeClassName={styles.active}>
                <a>
                  <Image
                    src="/icons/contaHeader.svg"
                    width="24"
                    height="24"
                    alt="Minha Conta"
                  />
                  Minha Conta
                </a>
              </ActiveLink>
            </li>

            <li>
              <ActiveLink href="/sair" activeClassName={styles.active}>
                <a>
                  <Image
                    src="/icons/sairHeader.svg"
                    width="24"
                    height="24"
                    alt="Sair"
                  />
                  Sair
                </a>
              </ActiveLink>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className={styles.nav}>
          <ul>
            <li>
              <ActiveLink href="/" activeClassName={styles.active}>
                <a>
                  <Image
                    src="/icons/dashHeader.svg"
                    width="24"
                    height="22"
                    alt="Dashboard"
                  />
                </a>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/alunos" activeClassName={styles.active}>
                <a>
                  <Image
                    src="/icons/alunosHeader.svg"
                    width="24"
                    height="18"
                    alt="Alunos"
                  />
                </a>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/aulas" activeClassName={styles.active}>
                <a>
                  <Image
                    src="/icons/aulasHeader.svg"
                    width="24"
                    height="22"
                    alt="Aulas"
                  />
                </a>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/planos" activeClassName={styles.active}>
                <a>
                  <Image
                    src="/icons/planosHeader.svg"
                    width="24"
                    height="22"
                    alt="Planos"
                  />
                </a>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/despesas" activeClassName={styles.active}>
                <a>
                  <Image
                    src="/icons/despesaHeader.svg"
                    width="24"
                    height="20"
                    alt="Despesas"
                  />
                </a>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/minha-conta" activeClassName={styles.active}>
                <a>
                  <Image
                    src="/icons/contaHeader.svg"
                    width="24"
                    height="24"
                    alt="Minha Conta"
                  />
                </a>
              </ActiveLink>
            </li>

            <li>
              <ActiveLink href="/sair" activeClassName={styles.active}>
                <a>
                  <Image
                    src="/icons/sairHeader.svg"
                    width="24"
                    height="24"
                    alt="Sair"
                  />
                </a>
              </ActiveLink>
            </li>
          </ul>
        </nav>
      )}

      <p className={styles.copy}>
        Feito por: <strong>Rajovi</strong>
      </p>
    </div>
  );
};
