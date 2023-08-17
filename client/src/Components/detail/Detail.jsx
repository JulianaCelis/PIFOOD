import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { recipeDetail, removeRecipe } from '../../Redux/actions';
import { useLoading } from '../../hooks/hooks';
import styles from './Detail.module.css';

export default function Detail(props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const recipes = useSelector((state) => state.recipeDetail);
    const loading = useLoading(recipeDetail, id);

    const handleDelete = () => {
        if (String(recipes.id).includes('-')) {
            if (window.confirm(`¿Estás seguro de eliminar la receta ${recipes.title}?`)) {
                dispatch(removeRecipe(recipes.id));
                alert(`Receta ${recipes.title} eliminada con éxito`);
                navigate('/home');
            }
        } else {
            alert('Solo puedes eliminar recetas creadas por el usuario.');
        }
    };

    if (!loading && !recipes) {
        return <div>Error al cargar los detalles de la receta.</div>;
    }

    // Mostrar mensaje de error si no hay pasos de preparación
    const stepByStepContent = recipes.steps && Array.isArray(recipes.steps) ? (
        recipes.steps.map((step, index) => (
            <div key={index} className={styles.stepByStep}>
                <h3>Step {step.number}</h3>
                <ul>
                    <p>{step.step}</p>
                </ul>
            </div>
        ))
    ) : (
        <div>No hay pasos de preparación disponibles.</div>
    );

    return (
        <div>
            <div className='invisible'></div>
            {loading ? (
                <span className={styles.loader}></span>
            ) : (
                <div className={styles.container}>
                    {/* Resto del código de renderizado */}
                    <Link to='/home'>
                        <button>Back To home</button>
                    </Link>
                    <h1>{recipes.title}</h1>
                    <h3>ID: {recipes.id}</h3>
                    <img src={recipes.image} alt="" />
                    <h3>Health Score: {recipes.healthScore}</h3>
                    {recipes.diets?.map((diet) => {
                        return (
                            <div className={styles.diet}>
                                <span>{diet.name}</span>
                            </div>
                        );
                    })}

                    <div className={styles.summary}>
                        <h2>Info: </h2>
                        <p dangerouslySetInnerHTML={{
                            __html: recipes.summary,
                        }}
                        ></p>
                    </div>

                    <h2 className={styles.stepByStep}>
                        Step By Step Preparation:
                    </h2>
                    {stepByStepContent}
                </div>
            )}
        </div>
    );
}
