import { useState } from 'react';
import styles from './Button.module.css';


export default function Button(props) {
    const type = props.type;
    const icon = props.icon;
    const value = props.value || 'Button...';
    const callFunction = props.onClick;
    const title = props.title;

    const style = {
        width: `${props.width}`,
        color: `${props.color}`,
        background: `${props.background}`,
    };

    const [screenTitle, setScreenTitle] = useState({
        onScreen: false,
        titleClassName: styles.titleBtnOff
    });

    async function showTitle() {
        setScreenTitle((state) => ({
            ...state, onScreen: true
        }));

        await new Promise((resolve) => setTimeout(resolve, 1500));

        setScreenTitle((state) => {
            if (state.onScreen) {
                return ({
                    ...state, titleClassName: styles.titleBtn
                });
            }
            else {
                return state;
            }
        });
    }

    async function hideTitle() {
        setScreenTitle(() => ({
            onScreen: false, titleClassName: styles.titleBtnOff
        }));
    }

    return (
        <span className={styles.btnContainer}>
            {
                title && 
                screenTitle.onScreen && 
                <span className={title 
                        ? screenTitle.titleClassName 
                        : styles.titleBtnOff}>
                    {title}
                </span>
            }

            <button 
                style={style} 
                className={styles.dafaultButton} 
                type={type} 
                onMouseEnter={showTitle} 
                onMouseLeave={hideTitle} 
                onClick={callFunction}
            >
                {icon}{value}
            </button>
        </span>
    );
}