import Card from '../tarjeta/Card';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, setCurrentPage } from '../../Redux/actions';
import { useLoading } from '../../hooks/hooks';
import { useState } from 'react';
import style from './Cards.module.css';

export default function Cards(props) {

    const allRecipes = useSelector((state) => state.recipes);

    // logica para crear e paginado
    // const [currentPage, setCurrentPage] = useState(1);

    const currentPage = useSelector((state)=>state.currentPage)

    const itemsPerPage = 9;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const visibleItems = allRecipes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(allRecipes.length / itemsPerPage);

    const pageNumber = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumber.push(i);
    }

    //Hook para oantalla de carga
    const dispatch = useDispatch()
    const loading = useLoading(dispatch,getRecipes);

    const nextPage = () => {
        dispatch(setCurrentPage('aum'));
    };

    const prevPage = () => {
        dispatch(setCurrentPage('dim'));
    };

    const handlePageChange = (page) => {
        dispatch(setCurrentPage(page));
    };

    return (
        <div className={style.page}>
            <div className='invisible'></div>
            <div className={style.pagination}>
                <input type="button"
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    value='Prev'
                />

                {pageNumber?.map((pagNum) => {
                    return (
                        <input type="button"
                            value={pagNum}
                            key={pagNum}
                            onClick={() => handlePageChange(pagNum)}
                        />
                    );
                })}

                <input type="button"
                    disabled={currentPage >= totalPages}
                    onClick={nextPage}
                    value='Next'
                />
            </div>
            <p>
                Page: {currentPage} of {totalPages}
            </p>
            {loading ? (
                <span className={style.loader}></span>
            ) : (
                <div className={style.container}>
                    {visibleItems?.map((recipe, index) => {
                        return (
                            <Card
                                key={index}
                                img={recipe.image}
                                name={recipe.title}
                                diets={recipe.diets}
                                id={recipe.id}
                                healthScore={recipe.healthScore}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};