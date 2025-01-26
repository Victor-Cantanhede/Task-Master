'use client'
import { useState } from "react";

import CadForm from "@/components/CadForm/CadForm";
import PageDefault from "@/components/PageDefault/PageDefault";
import Tasks from "@/components/Tasks/Tasks";


export default function Home() {

  /* State para armazenar os dados das tasks */
  const [tasksData, setTasksData] = useState([
    {
      id: 1,
      titulo: 'Título teste 001',
      descricao: 'Descrição teste 001',
      categoria: 'Trabalho',
      prazo: '25/01/2025',
      responsavel: 'Victor',
      dataHoraCadastro: '20/01/2025, 12:45:03',
      ultimaAlteracao: false,
      situacao: true
    }
  ]);

  /* Cadastrando nova task */
  function cadTaks(newTask) {

    const CadNewTask = {
      id: newTask.id,
      titulo: newTask.titulo,
      descricao: newTask.descricao,
      categoria: newTask.categoria,
      prazo: newTask.prazo,
      responsavel: newTask.responsavel,
      dataHoraCadastro: newTask.dataHoraAtual,
      ultimaAlteracao: newTask.ultimaAlteracao,
      situacao: newTask.situacao
    };

    setTasksData(() => [CadNewTask, ...tasksData]);
  }

  return (
    <PageDefault title='Cadastro'>
      <CadForm onSubmit={cadTaks} />
      <Tasks data={tasksData} />
    </PageDefault>
  );
}