import { useState } from 'react';

import Button from '../Button/Button';
import styles from './CadForm.module.css';


export default function CadForm(props) {
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

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [prazo, setPrazo] = useState('');
    const [responsavel, setResponsavel] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        const inputValue = {
            titulo,
            descricao,
            categoria,
            prazo,
            responsavel
        };

        props.onSubmit(inputValue);
    }

    function cleanInputs() {
        setTitulo('');
        setDescricao('');
        setCategoria('');
        setPrazo('');
        setResponsavel('');
    }

    return (
        <form className={styles.CadFormContainer} method="post" autoComplete="off" onSubmit={handleSubmit}>

            <div className={styles.titlesAndDescriptionsContainer}>
                <label htmlFor="ititulo">Título:</label>
                <input type="text" name="titulo" id="ititulo" onChange={(e) => setTitulo(e.target.value)} />
            </div>

            <div className={styles.titlesAndDescriptionsContainer}>
                <label htmlFor="idescricao">Descrição:</label>
                <textarea name="descricao" id="idescricao" onChange={(e) => setDescricao(e.target.value)} />
            </div>

            <div className={styles.categoriesContainer}>
                <div>
                    <label htmlFor="icategoria">Categoria:</label>
                    <select name="categoria" id="icategoria" defaultValue="CategoriaPlaceholder" onChange={(e) => setCategoria(e.target.value)}>
                        <option value="CategoriaPlaceholder" disabled hidden>Selecione...</option>
                        {categories.map((categorie) => {
                            return (
                                <option key={categorie.id} value={categorie.value}>{categorie.value}</option>
                            );
                        })}
                    </select>
                </div>

                <div>
                    <label htmlFor="iprazo">Prazo:</label>
                    <input type="date" name="prazo" id="iprazo" onChange={(e) => setPrazo(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="iresponsavel">Responsável:</label>
                    <select name="responsavel" id="iresponsavel" defaultValue="ResponsavelPlaceholder" onChange={(e) => setResponsavel(e.target.value)}>
                        <option value="ResponsavelPlaceholder" disabled hidden>Selecione...</option>
                        {agentes.map((agente) => {
                            return (
                                <option key={agente.id} value={agente.nome}>{agente.nome}</option>
                            );
                        })}
                    </select>
                </div>
            </div>

            <div className={styles.ButtonsContainer}>
                <Button type='submit' value='Cadastrar' />
                <Button type='reset' value='Limpar' onClick={cleanInputs} />
            </div>
        </form>
    );
}