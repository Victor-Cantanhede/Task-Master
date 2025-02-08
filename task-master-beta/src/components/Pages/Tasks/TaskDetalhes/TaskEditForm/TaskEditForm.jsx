import { useState } from 'react';
import { useTaskActions } from "@/services/useTaskActions";

import { SlActionUndo } from 'react-icons/sl';
import { VscSaveAs } from "react-icons/vsc";
import { ClipLoader } from 'react-spinners';
import WarnModal from '@/components/util/Moldals/WarnModal/WarnModal';
import Button from '@/components/util/Button/Button';
import styles from './TaskEditForm.module.css';

// Função para converter "DD/MM/YYYY" para "YYYY-MM-DD"
// Motivo: A data vem no formato pt-br do banco de dados
function convertDateToISO(dateString) {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
}

export default function TaskEditForm(props) {
    const { updateTask } = useTaskActions();
    const refreshTasks = props.refreshTasks;

    const task = props.task;

    const cancelAction = props.cancelAction 
        || (() => alert('Não foi passada uma função para esta ação!'));

    const categories = [
        {id: 1, value: 'Trabalho'},
        {id: 2, value: 'Estudos'},
        {id: 3, value: 'Pessoal'}
    ];

    const agentes = [
        {id: 1, nome: 'Victor'},
        {id: 2, nome: 'Mateus'},
        {id: 3, nome: 'Lucas'}
    ];

    /* STATES */
    const [warnProps, setWarnProps] = useState({
        message: null,
        type: null,
        duration: null
    });

    const [cadBtnValue, setCadBtnValue] = useState({
        icon: <VscSaveAs size={'1.3em'} />,
        value: 'Salvar'
    });

    const [inputTitulo, setInputTitulo] = useState(task.title);
    const [inputDescricao, setInputDescricao] = useState(task.description);
    const [inputCategoria, setInputCategoria] = useState(task.category);
    const [inputPrazo, setInputPrazo] = useState(convertDateToISO(task.prazo));
    const [inputResponsavel, setInputResponsavel] = useState(task.responsavel);


    /* Retornando objeto com os states via props */
    async function handleSubmit(e) {
        e.preventDefault();

        const prazoParts = inputPrazo.split('-');
        const prazoDate = new Date(prazoParts[0], prazoParts[1] - 1, prazoParts[2]);
        const dataAtual = new Date();

        /* Verificando se o prazo é uma data válida (dia futuro) */
        const isPrazoValid = prazoDate.getTime() > dataAtual.getTime();

        /* Criando objeto editedTaks */
        const editedTaks = {
            _id: task._id,
            titulo: inputTitulo,
            descricao: inputDescricao,
            categoria: inputCategoria,
            prazo: prazoDate.toLocaleDateString(`pt-br`),
            responsavel: inputResponsavel
        };
        
        /* Verificando se existem e quais campos estão vazios */
        const emptyFields = Object.entries(editedTaks)
            .filter(([key, value]) => !value)
            .map(([key]) => key);

        /* Enviando dados ao objeto warnProps para apresentar mensagem na tela*/
        if (emptyFields.length > 0) {
            setWarnProps(() => ({
                message: 'Ops... Todos os campos devem ser preenchidos!',
                type: 'erro',
                duration: 6000,
                key: Date.now()
            }));
            return;
        }

        /* Caso o prazo seja uma data inválida */
        if (!isPrazoValid) {
            setWarnProps(() => ({
                message: 'Ops... Prazo inválido, preencha uma data futura!',
                type: 'erro',
                duration: 6000,
                key: Date.now()
            }));
            return;
        }

        /* Ativando animação de loading no botão cadastrar */
        setCadBtnValue(() => ({
            icon: <ClipLoader size={15} color='white' loading />,
            value: ' '
        }));

        /* Enviando alteração para o backend */
        const success = await updateTask(editedTaks);

        if (success) {

            /* Sucesso na alteração */
            setWarnProps(() => ({
                message: 'Alteração realizada com sucesso!',
                type: 'confirm',
                duration: 2100,
                key: Date.now()
            }));
            
            setTimeout(() => {
                setCadBtnValue(() => ({
                    icon: <VscSaveAs size={'1.3em'} />,
                    value: 'Salvar'
                }));
    
                refreshTasks();
                cancelAction();                
            }, 2000);
        }
        else {

            /* Falha na alteração */
            setWarnProps(() => ({
                message: 'Erro. Tente novamente mais tarde!',
                type: 'erro',
                duration: 6000,
                key: Date.now()
            }));

            setCadBtnValue(() => ({
                icon: <VscSaveAs size={'1.3em'} />,
                value: 'Salvar'
            }));

            console.error('Ocorreu um erro no servidor!');
        }
    }

    return (
        <>
            <form 
                className={styles.editFormContainer} 
                method='post' 
                autoComplete='off' 
                onSubmit={handleSubmit}
            >
                <div className={styles.titleContainer}>
                    <label htmlFor="ititulo">Título:</label>
                    <input 
                        type="text" 
                        name="titulo" 
                        id="ititulo" 
                        value={inputTitulo}
                        onChange={(e) => setInputTitulo(e.target.value)} />
                </div>

                <div className={styles.categoriesContainer}>
                    <div>
                        <label htmlFor="icategoria">Categoria:</label>
                        <select 
                            name="categoria" 
                            id="icategoria" 
                            value={inputCategoria}
                            onChange={(e) => setInputCategoria(e.target.value)}>

                            <option 
                                value="CategoriaPlaceholder" 
                                disabled 
                                hidden>Selecione...</option>

                            {categories.map((categorie) => {
                                return (
                                    <option key={categorie.id} value={categorie.value}>{categorie.value}</option>
                                );
                            })}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="iprazo">Prazo:</label>
                        <input 
                            type="date" 
                            name="prazo" 
                            id="iprazo" 
                            value={inputPrazo}
                            onChange={(e) => setInputPrazo(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="iresponsavel">Responsável:</label>
                        <select 
                            name="responsavel" 
                            id="iresponsavel" 
                            value={inputResponsavel}
                            onChange={(e) => setInputResponsavel(e.target.value)}>

                            <option 
                                value="ResponsavelPlaceholder" 
                                disabled 
                                hidden>Selecione...</option>

                            {agentes.map((agente) => {
                                return (
                                    <option key={agente.id} value={agente.nome}>{agente.nome}</option>
                                );
                            })}
                        </select>
                    </div>
                </div>

                <div className={styles.DescriptionsContainer}>
                    <label htmlFor="idescricao">Descrição:</label>
                    <textarea 
                        name="descricao" 
                        id="idescricao" 
                        value={inputDescricao}
                        onChange={(e) => setInputDescricao(e.target.value)} />
                </div>

                <div className={styles.ButtonsContainer}>
                    <Button 
                        title={cadBtnValue.value} 
                        type='submit' 
                        background='#ffa500'
                        icon={cadBtnValue.icon}
                        value={' '}
                    />

                    <Button 
                        title='Cancelar' 
                        type='reset'
                        background='#ff3838' 
                        value={<SlActionUndo size={'1.3em'} />} 
                        onClick={cancelAction}
                    />
                </div>
            </form>

            <WarnModal warnProps={warnProps} />
        </>
    );
}