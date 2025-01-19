import styles from './PageDefault.module.css';


export default function PageDefault(props) {
    const title = props.title || 'Título da página';
    const content = props.children || 'Conteúdo da página...';

    return (
        <div className={styles.PageContentsContainer}>
            <h2>{title}</h2>
            <div className={styles.PageContents}>
                {content}
            </div>
        </div>
    );
}