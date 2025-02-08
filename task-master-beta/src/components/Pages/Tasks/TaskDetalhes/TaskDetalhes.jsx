import { useState } from "react";
import { useTaskActions } from "@/services/useTaskActions";

import { SlReload, SlActionUndo, SlArrowDown, SlPencil, SlTrash } from "react-icons/sl";

import TaskEditForm from "./TaskEditForm/TaskEditForm";
import ConfirmModal from "../../../util/Moldals/ConfirmModal/ConfirmModal";
import WarnModal from "@/components/util/Moldals/WarnModal/WarnModal";
import Button from '../../../util/Button/Button';
import styles from './TaskDetalhes.module.css';


export default function TaskDetalhes(props) {
    const { deleteTask, updateTask } = useTaskActions();
    const task = props.task;
    const refreshTasks = props.refreshTasks;

    const cancelAction = props.cancelAction 
        || (() => alert('Não foi passada uma função para esta ação!'));


    /* State para controlar warn modal */
    const [warnProps, setWarnProps] = useState({
        message: null,
        type: null,
        duration: null
    });

    /* State para habilitar edição da task */
    const [editOn, setEditOn] = useState(props.editOn);

    /* State para controlar render do modal de confirmação */
    const [sureDelete, setSureDelete] = useState(false);
    const [deleteId, setDeleteId] = useState('');


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
            closeDetails();
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

    /* Habilitando edição da task */
    function editTask() {
        setEditOn(!editOn);
        if (!editOn) { return }
        closeDetails();
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

            refreshTasks();
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
        closeDetails();
    }

    function closeDetails() {
        cancelAction({}, false);
    }

    return (
        <div className={styles.backgroundModal}>
            <div className={styles.ModalContainer}>
                <div className={styles.taskInfo}>
                    <h3 className={styles.modalTitle}>
                        {!editOn 
                            ? 'Detalhes da Task' 
                            : 'Edição de Task'
                        }
                    </h3>

                    {!editOn && 
                        <>
                            <h3>{task.title}</h3>
                            <div className={styles.modalCategories}>
                                <span>
                                    <p><strong>Categoria:</strong></p>
                                    <p>{task.category}</p>
                                </span>
                                <span>
                                    <p><strong>Prazo:</strong></p>
                                    <p>{task.prazo}</p>
                                </span>
                                <span>
                                    <p><strong>Situação:</strong></p>
                                    <p className={
                                            task.situacao === 'Pendente'
                                            ? styles.taskSituationPendente
                                            : (task.situacao === 'Concluído'
                                                ? styles.taskSituationCompleted
                                                : styles.taskSituationReab
                                            )
                                        }
                                    >{task.situacao}</p>
                                </span>
                                <span>
                                    <p><strong>Resposável:</strong></p>
                                    <p>{task.responsavel}</p>
                                </span>
                            </div>

                            <div className={styles.containerDescricao}>
                                <div>
                                    <p><strong>Descrição:</strong></p>
                                    <p>{task.description}</p>
                                </div>
                            </div>

                            <div className={styles.btnActionContainer}>

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

                                    {task.situacao !== 'Concluído' &&
                                        <>
                                            <Button 
                                                title='Editar' 
                                                value={<SlPencil size={'1.1em'} />} 
                                                onClick={editTask}
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

                                {/* Botão voltar */}
                                <Button
                                    onClick={closeDetails}
                                    icon={<SlActionUndo size={'1.3em'} />}
                                    value='Voltar'
                                />
                            </div>
                        </>
                    }

                    {editOn && 
                        <TaskEditForm 
                            task={task} 
                            refreshTasks={refreshTasks} 
                            cancelAction={editTask} 
                        />
                    }
                </div>
            </div>

            {sureDelete &&
                <ConfirmModal
                    title='Você tem certeza?'
                    message='Após confirmação, não será possível reverter esta ação!'
                    confirmAction={() => confirmDeleteTask()}
                    cancelAction={() => sureDeleteTask('')}
                />
            }

            <WarnModal warnProps={warnProps} />
        </div>
    );
}

/*
ATENÇÃO!!! Para controlar a renderização deste componente é necessário utilizar a renderização condicional no componente pai que irá chamar este modal
*/