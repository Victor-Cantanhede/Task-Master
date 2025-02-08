import Link from 'next/link';

import { SlNote, SlMagnifier, SlInfo } from "react-icons/sl";
import styles from './Layout.module.css';


export default function Layout(props) {
    const menuOptions = [
        {id: 1, icon: <SlNote />, title: 'Cadastro', link: '#'},
        //{id: 2, icon: <SlMagnifier />, title: 'Consulta', link: '#'},
        //{id: 3, icon: <SlInfo />, title: 'Suporte', link: '#'}
    ];

    return (
        <main className={styles.MainLayoutContainer}>

            <div className={styles.SideMenuContainer}>
                <div>
                    <aside>
                        <div>
                            <h1>Task</h1>
                            <h1>Master</h1>
                        </div>
                    </aside>
                    <nav>
                        <ul>
                            {menuOptions.map((option) => {
                                return (
                                    <li key={option.id}>
                                        <Link href={option.link}>{option.icon}{option.title}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </div>

            <div className={styles.ContentsLayoutContainer}>
                <div className={styles.ContentsLayout}>
                    {props.children}
                </div>
            </div>

        </main>
    );
}