import styles from './Button.module.css';


export default function Button(props) {
    const type = props.type;
    const value = props.value || 'Button...';
    const callFunction = props.onClick;

    const style = {
        color: `${props.color}`,
        background: `${props.background}`,
    };

    return (
        <button style={style} className={styles.dafaultButton} type={type} onClick={callFunction}>{value}</button>
    );
}