import { useEffect, useState } from 'react';

import { ClipLoader } from 'react-spinners';
import { SlCloudUpload } from "react-icons/sl";
import { AiOutlineClear } from "react-icons/ai";

import Button from '../../util/Button/Button';
import WarnModal from '../../util/Moldals/WarnModal/WarnModal';
import styles from './CadForm.module.css';


export default function CadForm(props) {
    const postTask = props.onSubmit;

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
        icon: <SlCloudUpload size={'1.3em'} />,
        value: 'Cadastrar'
    });

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [prazo, setPrazo] = useState('');
    const [responsavel, setResponsavel] = useState('');

    /* Alterando state titulo (formatado) */
    function inputTituloPattern(value) {
        const tituloValue = value.target.value;
        const formattedValue = tituloValue.toUpperCase().slice(0, 60);
        setTitulo(() => formattedValue);
    }

    /* Alterando state descricao (máx 20 mil caracteres) */
    function inputDescricaoPatten(value) {
        const descricaoValue = value.target.value.slice(0, 20000);
        setDescricao(() => descricaoValue);
    }

    /* Retornando objeto com os states via props */
    async function handleSubmit(e) {
        e.preventDefault();

        const prazoParts = prazo.split('-');
        const prazoDate = new Date(prazoParts[0], prazoParts[1] - 1, prazoParts[2]);
        const dataAtual = new Date();

        /* Verificando se o prazo é uma data válida (dia futuro) */
        const isPrazoValid = prazoDate.getTime() > dataAtual.getTime();

        /* Criando objeto newTask para passar ao componente pai */
        const newTaks = {
            titulo,
            descricao,
            categoria,
            prazo: prazoDate.toLocaleDateString(`pt-br`),
            responsavel
        };        
        
        /* Verificando se existem e quais campos estão vazios */
        const emptyFields = Object.entries(newTaks)
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
            icon: null,
            value: <ClipLoader size={15} color='white' loading />
        }));

        /* Enviando cadastro para o backend */
        const success = await postTask(newTaks);

        if (success) {

            /* Sucesso no cadastro */
            setWarnProps(() => ({
                message: 'Cadastro realizado com sucesso!',
                type: 'confirm',
                duration: 6000,
                key: Date.now()
            }));

            setCadBtnValue(() => ({
                icon: <SlCloudUpload size={'1.3em'} />,
                value: 'Cadastrar'
            }));

            cleanInputs();
        }
        else {

            /* Falha no cadastro */
            setWarnProps(() => ({
                message: 'Erro no cadastro. Tente novamente mais tarde!',
                type: 'erro',
                duration: 6000,
                key: Date.now()
            }));

            setCadBtnValue(() => ({
                icon: <SlCloudUpload size={'1.3em'} />,
                value: 'Cadastrar'
            }));

            console.error('Ocorreu um erro no servidor!');
        }
    }

    /* Limpando valores dos inputs */
    function cleanInputs() {
        setTitulo('');
        setDescricao('');
        setCategoria('');
        setPrazo('');
        setResponsavel('');
    }

    useEffect(() => {
        if (!warnProps) {
            return;
        }

        const timeoutId = setTimeout(() => {
            setWarnProps(() => ({
                message: null,
                type: null,
                duration: null
            }));            
        }, warnProps.duration);

        return clearTimeout(timeoutId);

    }, [warnProps]);

    return (
        <form 
            className={styles.CadFormContainer} 
            method="post" 
            autoComplete="off" 
            onSubmit={handleSubmit}>

            <WarnModal warnProps={warnProps} />

            <div className={styles.titlesAndDescriptionsContainer}>
                <label htmlFor="ititulo">Título:</label>
                <input 
                    type="text" 
                    name="titulo" 
                    id="ititulo" 
                    value={titulo} 
                    onChange={(e) => inputTituloPattern(e)} />
            </div>

            <div className={styles.titlesAndDescriptionsContainer}>
                <label htmlFor="idescricao">Descrição:</label>
                <textarea 
                    name="descricao" 
                    id="idescricao" 
                    value={descricao}
                    onChange={(e) => inputDescricaoPatten(e)} />
            </div>

            <div className={styles.categoriesContainer}>
                <div>
                    <label htmlFor="icategoria">Categoria:</label>
                    <select 
                        name="categoria" 
                        id="icategoria" 
                        value={categoria || 'CategoriaPlaceholder'} 
                        onChange={(e) => setCategoria(e.target.value)}>

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
                        value={prazo}
                        onChange={(e) => setPrazo(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="iresponsavel">Responsável:</label>
                    <select 
                        name="responsavel" 
                        id="iresponsavel" 
                        value={responsavel || 'ResponsavelPlaceholder'} 
                        onChange={(e) => setResponsavel(e.target.value)}>

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

            <div className={styles.ButtonsContainer}>
                <Button 
                    width='100px'
                    type='submit' 
                    icon={cadBtnValue.icon}
                    value={cadBtnValue.value} 
                />

                <Button 
                    title='Limpar' 
                    background='#ff3838' 
                    type='reset' 
                    icon={<AiOutlineClear size={'1.3em'} />}
                    value=' ' 
                    onClick={cleanInputs} 
                />
            </div>
        </form>
    );
}