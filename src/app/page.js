"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("sessaoAtiva") === "true" && sessionStorage.getItem("usuario")) {
      router.replace("/servico");
    }
  }, [router]);

  function entrar(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const usuario = String(form.get("usuario") || "").trim();
    const senha = String(form.get("senha") || "");

    if (usuario !== "user1" || senha !== "4321") {
      setErro("Usuário ou senha incorretos.");
      return;
    }

    sessionStorage.setItem("usuario", usuario);
    sessionStorage.setItem("sessaoAtiva", "true");
    sessionStorage.removeItem("agendamentos");
    sessionStorage.removeItem("agendamentoAtual");
    router.replace("/servico");
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.marca}>AGENDA</p>
        <h1>Entrar</h1>
        <p className={styles.descricao}>Acesse para ver seus agendamentos.</p>
        <form className={styles.form} onSubmit={entrar}>
          <label htmlFor="usuario">Usuário</label>
          <input id="usuario" name="usuario" autoComplete="username" placeholder="Digite seu usuário" required />
          <label htmlFor="senha">Senha</label>
          <input id="senha" name="senha" type="password" autoComplete="current-password" placeholder="Digite sua senha" required />
          {erro && <p className={styles.erro} role="alert">{erro}</p>}
          <button type="submit">Entrar</button>
        </form>
        <p className={styles.dica}>Acesso de demonstração: user1 / 4321</p>
      </section>
    </main>
  );
}
