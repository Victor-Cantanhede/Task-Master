import { useState } from "react";

import { ClipLoader } from "react-spinners";
import { SlLike, SlDislike } from "react-icons/sl";
import Button from "../../Button/Button";
import styles from './Confirm.module.css';


export default function ConfirmModal(props) {
    const title = props.title || 'Título modal';
    const message = props.message || 'Mensagem do modal';

    const confirmAction = props.confirmAction 
        || (() => alert('Não foi passada uma função para esta ação!'));

    const cancelAction = props.cancelAction 
        || (() => alert('Não foi passada uma função para esta ação!'));

    const [confirmBtnValue, setConfirmBtnValue] = useState({
        icon: <SlLike size={'1.3em'} />,
        value: 'Confirmar'
    });

    function handleClick() {
        setConfirmBtnValue(() => ({
            icon: null,
            value: <ClipLoader size={15} color='white' loading />
        }));
        confirmAction();
    }

    return (
        <div className={styles.backgroundModal}>
            <div className={styles.ConfirmModalContainer}>
                <span className={styles.icoStyle}><p>!</p></span>

                <h2>{title}</h2>

                <span className={styles.message}>{message}</span>

                <div className={styles.btnConfirmContainer}>

                    {/* Confirm button */}
                    <Button 
                        onClick={handleClick}
                        width='100px'
                        icon={confirmBtnValue.icon} 
                        value={confirmBtnValue.value} 
                        /*background='#11c011'*/
                    />

                    {/* Cancel button */}
                    <Button 
                        onClick={cancelAction}
                        width='100px'
                        icon={<SlDislike size={'1.3em'} />} 
                        value='Cancelar' 
                        background='#ff3838'
                    />
                </div>
            </div>
        </div>
    );
}

/*
ATENÇÃO!!! Para controlar a renderização deste componente é necessário utilizar a renderização condicional no componente pai que irá chamar este modal
*/