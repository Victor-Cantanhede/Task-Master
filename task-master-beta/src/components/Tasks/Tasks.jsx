import { useState } from "react";
import { SlArrowDown, SlMagnifier, SlPencil, SlTrash } from "react-icons/sl";
import Button from '../Button/Button';
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import WarnModal from "../WarnModal/WarnModal";
import styles from './Tasks.module.css';


export default function Tasks(props) {
    const tasksData = props.data;
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

    return (
        <div className={styles.allTasksContainer}>

            <WarnModal warnProps={warnProps} />

            {sureDelete && 
                <ConfirmModal 
                    title='Você tem certeza?' 
                    message='Após confirmação, não será possível reverter esta ação!' 
                    confirmAction={() => confirmDeleteTask()} 
                    cancelAction={() => sureDeleteTask('')} 
                />            
            }

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
                                    <p><strong>Responsável:</strong></p>
                                    <p>{task.responsavel}</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.btnContainer}>
                            <Button 
                                title='Concluir' 
                                background='#11c011' 
                                value={<SlArrowDown size={'1.1em'} />} 
                            />

                            <Button 
                                title='Visualizar' 
                                value={<SlMagnifier size={'1.1em'} />} 
                            />

                            <Button 
                                title='Editar' 
                                value={<SlPencil size={'1.1em'} />} 
                            />
                            
                            <Button 
                                title='Excluir' 
                                background='#ff3838' 
                                value={<SlTrash size={'1.1em'} />} 
                                onClick={() => sureDeleteTask(task._id)} 
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}