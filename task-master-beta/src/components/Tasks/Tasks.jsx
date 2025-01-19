import styles from './Tasks.module.css';


export default function Tasks(props) {
    const tasksData = props.data;

    return (
        <>
            {tasksData.map((task) => {
                return (
                    <div key={task.id}>
                        <p>{task.titulo}</p>
                        <p>{task.descricao}</p>
                        <p>{task.categoria}</p>
                        <p>{task.prazo}</p>
                        <p>{task.responsavel}</p>
                    </div>
                );
            })}
        </>
    );
}