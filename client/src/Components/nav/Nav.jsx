import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    filterByDiet,
    filterByOrigin,
    getDiets,
    orderByHealthScore,
    orderByName,
    toggleDarkMode,
    setCurrentPage,
} from '../../Redux/actions';
import { useLoadOnGlblState } from '../../hooks/hooks';
import SearchBar from '../busqueda/SearchBar'; // Asegúrate de importar correctamente SearchBar
import styles from './Nav.module.css';

export default function Nav(props) {
    const dispatch = useDispatch();

    const darkMode = useSelector((state) => state.darkMode);
    const diets = useLoadOnGlblState('allDiets', getDiets);

    const location = useLocation();

    const handleFilter = (event) => {
        dispatch(filterByDiet(event.target.value));
        dispatch(setCurrentPage(1));
    };

    const handleOrder = (event) => {
        dispatch(orderByName(event.target.value));
    };

    const handleOrderHealthScore = (event) => {
        dispatch(orderByHealthScore(event.target.value));
    };

    const handleFilterOrigin = (event) => {
        dispatch(filterByOrigin(event.target.value));
        dispatch(setCurrentPage(1));
    };

    const handleClick = (event) => {
        event.preventDefault();
        dispatch(toggleDarkMode());
    };

    // Verificar si la ruta actual es /form
    if (location.pathname === '/form' || location.pathname.startsWith('/detail')) {
        return null; 
    }

    return (
        <div className={styles.container}>
            {/* Verifica si la ruta actual es /form y muestra el botón solo si no es /form */}
            {location.pathname !== '/form' && (
                <>
                    <button onClick={handleClick}>
                        Toggle {darkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                    <Link to='/form'>
                        <button>Create Recipe</button>
                    </Link>
                </>
            )}

            <div className={styles.filterSelect}>
                <label htmlFor="filterSelect">Filter By Diets</label>
                <select name="filter"
                    id="filterSelect"
                    onChange={handleFilter}
                    defaultValue='--Select--'>

                    <option disabled>--Select--</option>
                    <option value='NF'>--Select--</option>
                    {diets?.map((diet, index) => {
                        return (
                            <option key={index} value={diet.name}>
                                {diet.name}
                            </option>
                        );
                    })}
                </select>
            </div>

            <div className={styles.origin}>
                <label htmlFor="origin">Filter By Origin</label>
                <select name="origin"
                    id="origin"
                    defaultValue='--Select--'
                    onChange={handleFilterOrigin}>

                    <option disabled>--Select--</option>
                    <option value="NF">No Filter</option>
                    <option value="API">API</option>
                    <option value="DB">Data Base</option>
                </select>
            </div>

            <div className={styles.orderSelect}>
                <label htmlFor='orderSelect'>Order By Name</label>
                <select
                    onChange={handleOrder}
                    name='orderSelect'
                    id='orderSelect'
                    defaultValue='--Select--'
                >
                    <option disabled>--Select--</option>
                    <option value='A'>A - Z</option>
                    <option value='D'>Z - A</option>
                </select>
            </div>

            <div>
                <label htmlFor='orderHealthScore'>Order By Health Score</label>
                <select
                    onChange={handleOrderHealthScore}
                    name='orderHealthScore'
                    id='orderHealthScore'
                    defaultValue='--Select--'
                >
                    <option disabled>--Select--</option>
                    {/* <option value='N'>None</option> */}
                    <option value='A'>0 - 100</option>
                    <option value='D'>100 - 0</option>
                </select>
            </div>

            {/* Agregar el componente SearchBar */}
            <SearchBar />
        </div>
    );
}
