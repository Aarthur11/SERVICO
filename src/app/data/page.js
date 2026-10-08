'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthGuard from "@/app/components/AuthGuard";
import styles from '@/app/data/data.module.css';

const horarios = ['09:00', '10:30', '14:00'];

export default function DataPage() {
  const router = useRouter();
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [minData, setMinData] = useState('');

  useEffect(() => {
    const hoje = new Date();
    hoje.setMinutes(hoje.getMinutes() - hoje.getTimezoneOffset());
    setMinData(hoje.toISOString().slice(0, 10));
    try {
      const atual = JSON.parse(sessionStorage.getItem('agendamentoAtual') || '{}');
      setData(atual.data || '');
      setHorario(atual.horario || '');
    } catch {
      sessionStorage.removeItem('agendamentoAtual');
    }
  }, []);

  function continuar() {
    if (!data || !horario) return;
    let atual = {};
    try {
      atual = JSON.parse(sessionStorage.getItem('agendamentoAtual') || '{}');
    } catch {}
    sessionStorage.setItem('agendamentoAtual', JSON.stringify({ ...atual, data, horario }));
    router.push('/confirmacao');
  }

  return (
    <AuthGuard>
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>Data e horário</h1>
          <label htmlFor="data">Escolha uma data</label>
          <input type="date" id="data" className={styles.data} min={minData} value={data} onChange={(event) => setData(event.target.value)} />
          <label>Horários disponíveis</label>
          <div className={styles.horarios}>
            {horarios.map((item) => (
              <button key={item} type="button" className={horario === item ? styles.selecionado : ''} aria-pressed={horario === item} onClick={() => setHorario(item)}>
                {item}
              </button>
            ))}
          </div>
          <button className={styles.continuar} type="button" disabled={!data || !horario} onClick={continuar}>
            Continuar
          </button>
        </main>
      </div>
    </AuthGuard>
  );
}