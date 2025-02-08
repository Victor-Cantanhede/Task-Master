import { useState } from "react";
import { useTaskActions } from "@/services/useTaskActions";
import { SlArrowDown, SlMagnifier, SlPencil, SlTrash, SlReload } from "react-icons/sl";

import TaskDetalhes from "./TaskDetalhes/TaskDetalhes";
import Button from '../../util/Button/Button';
import ConfirmModal from "../../util/Moldals/ConfirmModal/ConfirmModal";
import WarnModal from "../../util/Moldals/WarnModal/WarnModal";
import styles from './Tasks.module.css';


export default function Tasks(props) {
    const { updateTask } = useTaskActions();
    const tasksData = props.data;
    const refreshTasks = props.refreshTasks;
    const deleteTask = props.deleteTask;

    /* State para controlar warn modal */
    const [warnProps, setWarnProps] = useState({
        message: null,
        type: null,
        duration: null
    });

    /* State para controlar render do modal de confirmação */
    const [sureDelete, setSureDelete] = useState(false);
    const [deleteId, setDeleteId] = useState('');

    /* State para controlar render do modal de detalhes da task */
    const [detailsOn, setDetailsOn] = useState(false);
    const [taskDetails, setTaskDetails] = useState({});

    /* State para controlar render do modal edit task */
    const [editOn, setEditOn] = useState(false);


    /* Função para concluir OU reabrir a task */
    async function concluirTask(task) {
        const completedTask = {
            _id: task._id,
            titulo: task.title,
            descricao: task.description,
            categoria: task.category,
            prazo: task.prazo,
            responsavel: task.responsavel,
            situacao: 
                task.situacao === 'Pendente' || task.situacao === 'Reaberta'
                ? 'Concluído'
                : 'Reaberta'
        };
        
        /* Enviando alteração para o backend */
        const success = await updateTask(completedTask);

        if (success) {
            const taskSituation = completedTask.situacao === 'Concluído'
                ? 'concluída' : 'reaberta'

            /* Sucesso na conclusão */
            setWarnProps(() => ({
                message: `Tarefa ${taskSituation} com sucesso!`,
                type: 'confirm',
                duration: 3000,
                key: Date.now()
            }));

            refreshTasks();
        }
        else {

            /* Falha na conclusão */
            setWarnProps(() => ({
                message: 'Erro: Tente novamente mais tarde!',
                type: 'erro',
                duration: 3000,
                key: Date.now()
            }));
        }
    }

    /* Chamando modal de confirmação */
    function sureDeleteTask(id) {
        setDeleteId(id);
        setSureDelete(!sureDelete);
    }

    /* Confirmando exclusão da task */
    async function confirmDeleteTask() {
        const success = await deleteTask(deleteId);

        if (success) {

            /* Sucesso na exclusão */
            setWarnProps(() => ({
                message: 'Exclusão realizada com sucesso!',
                type: 'confirm',
                duration: 6000,
                key: Date.now()
            }));
        }
        else {

            /* Sucesso na exclusão */
            setWarnProps(() => ({
                message: 'Erro na exclusão. Tente novamente mais tarde!',
                type: 'erro',
                duration: 6000,
                key: Date.now()
            }));
            console.error('Ocorreu um erro no servidor!');
        }

        sureDeleteTask('');
    }

    /* Função para mostrar modal com detalhes/edição da task */
    function showDetails(task, editState) {
        setDetailsOn(!detailsOn);
        setEditOn(editState);
        setTaskDetails(() => task);
    }

    return (
        <div className={styles.allTasksContainer}>

            {tasksData.map((task) => {
                return (
                    <div className={styles.taskContainer} key={task._id}>
                        <div className={styles.taskContents}>
                            <div className={styles.taskTitle}>
                                <p><strong>Título:</strong></p>
                                <p>{task.title}</p>
                            </div>
                            <div className={styles.taskCategories}>
                                <div>
                                    <p><strong>Categoria:</strong></p>
                                    <p>{task.category}</p>
                                </div>
                                <div>
                                    <p><strong>Prazo:</strong></p>
                                    <p>{task.prazo}</p>
                                </div>
                                <div>
                                    <p><strong>Situação:</strong></p>
                                    <p 
                                        className={
                                            task.situacao === 'Pendente'
                                            ? styles.taskSituationPendente
                                            : (task.situacao === 'Concluído'
                                                ? styles.taskSituationCompleted
                                                : styles.taskSituationReab
                                            )
                                        }
                                    >{task.situacao}</p>
                                </div>
                                <div>
                                    <p><strong>Responsável:</strong></p>
                                    <p>{task.responsavel}</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.btnContainer}>

                            <Button 
                                title={task.situacao === 'Pendente'
                                    ? 'Concluir'
                                    : task.situacao === 'Reaberta'
                                    ? 'Concluir'
                                    : 'Reabrir'
                                } 
                                background={task.situacao === 'Concluído'
                                    ? '#ffa500'
                                    : '#11c011'
                                } 
                                value={task.situacao === 'Concluído'
                                    ? <SlReload size={'1.1em'} />
                                    : <SlArrowDown size={'1.1em'} />
                                } 
                                onClick={() => concluirTask(task)}
                            />

                            <Button 
                                title='Visualizar' 
                                value={<SlMagnifier size={'1.1em'} />} 
                                onClick={() => showDetails(task, false)} 
                            />

                            {task.situacao !== 'Concluído' &&
                                <>
                                    <Button 
                                        title='Editar' 
                                        value={<SlPencil size={'1.1em'} />} 
                                        onClick={() => showDetails(task, true)}
                                    />

                                    <Button 
                                        title='Excluir' 
                                        background='#ff3838' 
                                        value={<SlTrash size={'1.1em'} />} 
                                        onClick={() => sureDeleteTask(task._id)} 
                                    />
                                </>
                            }
                        </div>
                    </div>
                );
            })}

            {detailsOn && 
                <TaskDetalhes 
                    task={taskDetails} 
                    editOn={editOn} 
                    refreshTasks={refreshTasks}
                    cancelAction={showDetails} 
                />
            }

            <WarnModal warnProps={warnProps} />

            {sureDelete && 
                <ConfirmModal 
                    title='Você tem certeza?' 
                    message='Após confirmação, não será possível reverter esta ação!' 
                    confirmAction={() => confirmDeleteTask()} 
                    cancelAction={() => sureDeleteTask('')} 
                />            
            }

        </div>
    );
}