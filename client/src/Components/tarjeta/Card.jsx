import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

export default function Card(props) {
    const { name, img, diets, id, healthScore } = props;
    console.log('ID recibido en Card:', id);

    // Mostrar mensaje de error si no hay dietas
    const dietTagsContent = diets?.length > 0 ? (
        diets.map((diet, index) => (
            <span key={index} className={styles.dietTag}>
                {diet.name}
            </span>
        ))
    ) : (
        <div>No se encontraron etiquetas de dieta.</div>
    );

    return (
        <div className={styles.card}>
            <div className={styles.description}>
                <Link to={`/detail/${id}`} className={styles.link}>
                    <h1 className={styles.recipeTitle}>{name}</h1>
                </Link>
                <img src={img} alt="" className={styles.recipeImg} />
                <div className={styles.dietTags}>
                    {dietTagsContent}
                </div>
                <span className={styles.healthScore}>
                    <h3 className={styles.healthScoreTitle}>Health Score:</h3>
                    {healthScore}
                </span>
            </div>
        </div>
    );
}
