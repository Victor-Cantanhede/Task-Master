import { useEffect, useState } from "react";

import { SlInfo } from "react-icons/sl";
import { VscWarning, VscCheck } from "react-icons/vsc";
import styles from './WarnModal.module.css';


export default function WarnModal({ warnProps }) {    
    
    const [warnOn, setWarnOn] = useState(false);
    
    const warnAnimationOut = `warnOut ${warnProps.duration / 1000}s linear forwards`;

    const typeStyle = () => {
        switch (warnProps.type) {
            case 'confirm':
                return {
                    background: 'linear-gradient(to right, #21c221, #37db37, #37db37',
                    animation: warnAnimationOut
                };
            case 'warn':
                return {
                    background: '#fdd90e',
                    animation: warnAnimationOut
                };            
            case 'erro':
                return {
                    background: 'linear-gradient(to right, #c70909, #d31616, #df2222)',
                    animation: warnAnimationOut
                };
            default:
                return null;
        }
    }

    useEffect(() => {
        if (!warnProps.message || !warnProps.type || !warnProps.duration) {
            return;
        }
    
        setWarnOn(true);
    
        const timeoutId = setTimeout(() => {
            setWarnOn(false);
        }, warnProps.duration);

        return () => clearTimeout(timeoutId);

    }, [warnProps.key]);

    useEffect(() => {
        if (warnOn && (warnProps.type === 'erro' || warnProps.type === 'warn')) {
            console.warn(warnProps.message);
            return;
        }
        if (warnOn && warnProps.type === 'confirm') {
            console.log(warnProps.message);
            return;
        }
    }, [warnOn]);

    if (!warnOn) {
        return null;
    }

    return (
        <span 
            style={typeStyle()} 
            className={styles.WarnModalContainer}>

            <div className={styles.WarnModalContents}>
                {
                    (warnProps.type === 'confirm' && <VscCheck size='2em' />) ||
                    (warnProps.type === 'warn' && <SlInfo size='2em' />) ||
                    (warnProps.type === 'erro' && <VscWarning size='2em' />)
                }
                <span>{warnProps.message}</span>
            </div>

            <div 
                style={{animation: `barOut ${warnProps.duration / 1000}s linear forwards`}} 
                className={styles.WarnModalBar}>
            </div>
        </span>
    );
}