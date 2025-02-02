'use client'
import { useTaskActions } from "@/services/useTaskActions";
import CadForm from "@/components/Pages/CadForm/CadForm";
import PageDefault from "@/components/layout/PageDefault/PageDefault";
import Tasks from "@/components/Tasks/Tasks";


export default function Home() {
  const { tasksData, postTask, deleteTask } = useTaskActions();

  return (
    <PageDefault title='Cadastro'>
      <CadForm onSubmit={postTask} />
      <Tasks data={tasksData} deleteTask={deleteTask} />
    </PageDefault>
  );
}