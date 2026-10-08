"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/app/components/AuthGuard";
import styles from "./agendamentos.module.css";

function lerAgendamentos() {
  try {
    return JSON.parse(sessionStorage.getItem("agendamentos") || "[]");
  } catch {
    return [];
  }
}

function formatarData(data) {
  if (!data) return "—";
  return new Date(`${data}T00:00:00`).toLocaleDateString("pt-BR");
}

export default function AgendamentosPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    setUsuario(sessionStorage.getItem("usuario") || "");
    setAgendamentos(lerAgendamentos());
  }, []);

  function novoAgendamento() {
    sessionStorage.removeItem("agendamentoAtual");
    router.push("/servico");
  }

  function sair() {
    sessionStorage.removeItem("sessaoAtiva");
    sessionStorage.removeItem("usuario");
    sessionStorage.removeItem("agendamentos");
    sessionStorage.removeItem("agendamentoAtual");
    router.replace("/");
  }

  return (
    <AuthGuard>
      <main className={styles.page}>
        <section className={styles.container}>
          <header className={styles.header}>
            <div>
              <p className={styles.marca}>MINHA AGENDA</p>
              <h1>Agendamentos</h1>
              <p className={styles.subtitulo}>Olá, {usuario}.</p>
            </div>
            <button className={styles.sair} type="button" onClick={sair}>
              Sair
            </button>
          </header>

          <button className={styles.novo} type="button" onClick={novoAgendamento}>
            + Agendar serviço
          </button>

          <div className={styles.lista}>
            {agendamentos.length === 0 ? (
              <div className={styles.vazio}>
                <p>Você ainda não tem agendamentos.</p>
                <span>Seus próximos horários aparecerão aqui.</span>
              </div>
            ) : (
              agendamentos.map((item) => (
                <article className={styles.item} key={item.protocolo}>
                  <div className={styles.itemTopo}>
                    <h2>{item.servico}</h2>
                    <span className={styles.status}>Confirmado</span>
                  </div>
                  <p>Data: {formatarData(item.data)}</p>
                  <p>Horário: {item.horario}</p>
                  <p>Protocolo: {item.protocolo}</p>
                </article>
              ))
            )}
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}