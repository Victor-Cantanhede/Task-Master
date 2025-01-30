'use client'
import { useState } from "react";

import CadForm from "@/components/CadForm/CadForm";
import PageDefault from "@/components/PageDefault/PageDefault";
import Tasks from "@/components/Tasks/Tasks";


export default function Home() {

  /* State para armazenar os dados das tasks */
  const [tasksData, setTasksData] = useState([]);

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