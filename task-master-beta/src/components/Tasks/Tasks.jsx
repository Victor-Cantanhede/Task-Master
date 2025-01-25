import { SlArrowDown, SlMagnifier, SlPencil, SlTrash } from "react-icons/sl";
import Button from '../Button/Button';
import styles from './Tasks.module.css';


export default function Tasks(props) {
    const tasksData = props.data;

    return (
        <div className={styles.allTasksContainer}>
            {tasksData.map((task) => {
                return (
                    <div className={styles.taskContainer} key={task.id}>
                        <div className={styles.taskContents}>
                            <div className={styles.taskTitle}>
                                <p><strong>Título:</strong></p>
                                <p>{task.titulo}</p>
                            </div>
                            <div className={styles.taskCategories}>
                                <div>
                                    <p><strong>Categoria:</strong></p>
                                    <p>{task.categoria}</p>
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
                            <Button title='Concluir' background='#11c011' value={<SlArrowDown />} />

                            <Button title='Visualizar' value={<SlMagnifier />} />

                            <Button title='Editar' value={<SlPencil />} />
                            
                            <Button title='Excluir' background='#ff3838' value={<SlTrash />} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}