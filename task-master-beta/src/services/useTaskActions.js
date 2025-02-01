import { useState, useEffect } from 'react';
import api from './api.js';

export function useTaskActions() {

    /* State para armazenar os dados das tasks */
    const [tasksData, setTasksData] = useState([]);

    /* Função para buscar as tasks */
    const getTask = async () => {
        try {
            const response = await api.get('/Task');
            setTasksData(response.data);
        }
        catch (error) {
            console.log(`GET ERROR: ${error}`);
        }
    };

    /* Função para cadastrar nova task */
    const postTask = async (newTask) => {
        try {
            const CadNewTask = {
                title: newTask.titulo,
                description: newTask.descricao,
                category: newTask.categoria,
                prazo: newTask.prazo,
                responsavel: newTask.responsavel
            };
        
            await api.post('/Task', CadNewTask);
            getTask();
            return true; // Comunicando sucesso ao frontend
        }
        catch (error) {
            console.log(`POST ERROR: ${error}`);
            return false; // Comunicando erro ao frontend
        }
    };

    /* Função para deletar uma task */
    const deleteTask = async (id) => {
        try {
            await api.delete(`/Task/${id}`);
            getTask();
            return true; // Comunicando sucesso ao frontend
        }
        catch (error) {
            console.log(`DELETE ERROR: ${error}`);
            return false; // Comunicando erro ao frontend
        }
    };

    /* useEffect para buscar as tasks quando o hook for usado */
    useEffect(() => {
        getTask();
    }, []);

    return { tasksData, getTask, postTask, deleteTask };
}