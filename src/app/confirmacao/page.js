"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/app/components/AuthGuard";
import styles from "./confirmacao.module.css";

export default function ConfirmacaoPage() {
  const router = useRouter();
  const [agendamento, setAgendamento] = useState(null);

  useEffect(() => {
    const usuario = sessionStorage.getItem("usuario");
    let atual = {};
    try {
      atual = JSON.parse(sessionStorage.getItem("agendamentoAtual") || "{}");
    } catch {
      sessionStorage.removeItem("agendamentoAtual");
    }

    if (!usuario || !atual.servico || !atual.data || !atual.horario) {
      router.replace("/servico");
      return;
    }

    setAgendamento({
      ...atual,
      nome: usuario,
      dataFormatada: new Date(`${atual.data}T00:00:00`).toLocaleDateString("pt-BR"),
    });
  }, [router]);

  function confirmarAgendamento() {
    if (!agendamento) return;
    let lista = [];
    try {
      lista = JSON.parse(sessionStorage.getItem("agendamentos") || "[]");
      if (!Array.isArray(lista)) lista = [];
    } catch {
      lista = [];
    }

    const protocolo = `AG-${Date.now().toString().slice(-6)}`;
    const confirmado = {
      servico: agendamento.servico,
      data: agendamento.data,
      horario: agendamento.horario,
      nome: agendamento.nome,
      protocolo,
    };
    sessionStorage.setItem("agendamentos", JSON.stringify([...lista, confirmado]));
    sessionStorage.setItem("ultimoProtocolo", protocolo);
    sessionStorage.removeItem("agendamentoAtual");
    router.push("/resultado");
  }

  return (
    <AuthGuard>
      {!agendamento ? null : (
        <main className={styles.page}>
          <section className={styles.card}>
            <h1 className={styles.titulo}>Revisar agendamento</h1>
            <div className={styles.detalhes}>
              <p><strong>Serviço:</strong> {agendamento.servico}</p>
              <p><strong>Data:</strong> {agendamento.dataFormatada}</p>
              <p><strong>Horário:</strong> {agendamento.horario}</p>
              <p><strong>Nome:</strong> {agendamento.nome}</p>
            </div>
            <button type="button" className={styles.botaoVoltar} onClick={() => router.push("/servico")}>
              Voltar e editar
            </button>
            <button type="button" className={styles.botaoConfirmar} onClick={confirmarAgendamento}>
              Confirmar
            </button>
          </section>
        </main>
      )}
    </AuthGuard>
  );
}
