"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AuthGuard from "@/app/components/AuthGuard";
import styles from "./resultado.module.css";

export default function ResultadoPage() {
  const [protocolo, setProtocolo] = useState("XXXXX");

  useEffect(() => {
    setProtocolo(sessionStorage.getItem("ultimoProtocolo") || "XXXXX");
  }, []);

  return (
    <AuthGuard>
      <main className={styles.page}>
        <section className={styles.card}>
          <div className={styles.check} aria-label="Confirmado"><span /></div>
          <h1>Agendamento<br />confirmado!</h1>
          <p>Protocolo: {protocolo}</p>
          <Link href="/agendamentos" className={styles.botao}>Ver agendamentos</Link>
        </section>
      </main>
    </AuthGuard>
  );
}
