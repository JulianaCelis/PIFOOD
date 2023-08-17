import Cards from "../tarjetas/Cards";
import styles from './Home.module.css';

export default function Home(props) {

    return (
        <div className={styles.front}>
            <div className={styles.pag}>
                <Cards />
            </div>
        </div>
    )
}