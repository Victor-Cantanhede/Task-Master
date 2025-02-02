import { useState } from "react";

import { ClipLoader } from "react-spinners";
import { SlActionUndo } from "react-icons/sl";
import Button from '../../util/Button/Button';
import styles from './TaskDetalhes.module.css';


export default function TaskDetalhes(props) {
    const task = props.task;

    const confirmAction = props.confirmAction 
        || (() => alert('Não foi passada uma função para esta ação!'));

    const cancelAction = props.cancelAction 
        || (() => alert('Não foi passada uma função para esta ação!'));

    function handleClick() {
        cancelAction();
    }

    return (
        <div className={styles.backgroundModal}>
            <div className={styles.ModalContainer}>
                <div className={styles.taskInfo}>
                    <h3 className={styles.modalTitle}>Detalhes da Task</h3>

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

                        {/* Cancel button */}
                        <Button
                            onClick={handleClick}
                            icon={<SlActionUndo size={'1.3em'} />}
                            value='Voltar'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

/*
ATENÇÃO!!! Para controlar a renderização deste componente é necessário utilizar a renderização condicional no componente pai que irá chamar este modal
*/