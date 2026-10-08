'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthGuard from "@/app/components/AuthGuard";
import styles from './servico.module.css';

export default function ServicoPage() {
  const router = useRouter();
  const [servico, setServico] = useState('');

  function continuar() {
    if (!servico) return;
    sessionStorage.setItem('agendamentoAtual', JSON.stringify({ servico }));
    router.push('/data');
  }

  return (
    <AuthGuard>
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>Agendar serviço</h1>
          {['Corte de cabelo', 'Manutenção', 'Consultoria'].map((item) => (
            <label key={item}>
              <span>{item}</span>
              <input type="radio" name="servico" value={item} checked={servico === item} onChange={() => setServico(item)} />
            </label>
          ))}
          <button className={styles.continuar} type="button" disabled={!servico} onClick={continuar}>
            Continuar
          </button>
        </main>
      </div>
    </AuthGuard>
  );
}