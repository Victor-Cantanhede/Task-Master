'use client'
import { useTaskActions } from "@/services/useTaskActions";
import CadForm from "@/components/Pages/CadForm/CadForm";
import PageDefault from "@/components/layout/PageDefault/PageDefault";
import Tasks from "@/components/Pages/Tasks/Tasks";


export default function Home() {
  const { tasksData, getTask, postTask, deleteTask } = useTaskActions();

  return (
    <PageDefault title='Cadastro'>
      <CadForm onSubmit={postTask} />
      <Tasks 
        data={tasksData} 
        refreshTasks={getTask} 
        deleteTask={deleteTask} 
      />
    </PageDefault>
  );
}