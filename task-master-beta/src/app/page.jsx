'use client'
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import CadForm from "@/components/CadForm/CadForm";
import PageDefault from "@/components/PageDefault/PageDefault";
import Tasks from "@/components/Tasks/Tasks";


export default function Home() {

  /* Gerando ID único */
  const uniqueId = uuidv4();

  /* State para armazenar os dados das tasks */
  const [tasksData, setTasksData] = useState([
    {
      id: uniqueId,
      titulo: 'Título teste 001',
      descricao: 'Descrição teste 001',
      categoria: 'Trabalho',
      prazo: '25/01/2025',
      responsavel: 'Victor'
    }
  ]);

  /* Cadastrando nova task */
  function cadTaks(inputValue) {

    const newTask = {
      id: uniqueId,
      titulo: inputValue.titulo,
      descricao: inputValue.descricao,
      categoria: inputValue.categoria,
      prazo: inputValue.prazo,
      responsavel: inputValue.responsavel
    };

    setTasksData(() => [newTask, ...tasksData]);
  }

  return (
    <PageDefault title='Cadastro'>
      <CadForm onSubmit={cadTaks} />
      <Tasks data={tasksData} />
    </PageDefault>
  );
}