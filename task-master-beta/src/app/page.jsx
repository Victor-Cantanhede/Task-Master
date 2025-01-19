'use client'
import { useState } from "react";

import CadForm from "@/components/CadForm/CadForm";
import PageDefault from "@/components/PageDefault/PageDefault";
import Tasks from "@/components/Tasks/Tasks";


export default function Home() {
  const [tasksData, setTasksData] = useState([
    {
      id: 1,
      titulo: 'Título teste 001',
      descricao: 'Descrição teste 001',
      categoria: 'Trabalho',
      prazo: '25/01/2025',
      responsavel: 'Victor'
    },
    {
      id: 2,
      titulo: 'Título teste 002',
      descricao: 'Descrição teste 002',
      categoria: 'Pessoal',
      prazo: '25/01/2025',
      responsavel: 'Mateus'
    },
    {
      id: 3,
      titulo: 'Título teste 003',
      descricao: 'Descrição teste 003',
      categoria: 'Estudos',
      prazo: '25/01/2025',
      responsavel: 'Lucas'
    }
  ]);

  function cadTaks(inputValue) {
    console.log(inputValue);
  }

  return (
    <PageDefault title='Cadastro'>
      <CadForm onSubmit={cadTaks} />
      <Tasks data={tasksData} />
    </PageDefault>
  );
}