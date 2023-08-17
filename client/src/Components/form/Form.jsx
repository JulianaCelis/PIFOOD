import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipe } from '../../Redux/actions';
import { validateForm } from '../../functions';
import styles from './Form.module.css';

export default function Form(props) {
    const allDiets = useSelector((state) => state.allDiets);
    const recipes = useSelector((state) => state.recipes);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        title: '',
        image: '',
        summary: '',
        healthScore: '',
        steps: [],
        diets: [],
        numSteps: 0,
        createdByUser: true,
    });

    const [errors, setErrors] = useState({
        title: '',
        image: '',
        summary: '',
        healthScore: '',
        steps: '',
        diets: '',
    });

    const [stepDescription, setStepDescription] = useState('');

    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        setForm({ ...form, [property]: value });

        validateForm({ ...form, [property]: value }, setErrors, errors, recipes);
    };

    const clearForm = (event) => {
        event.preventDefault();
        setForm({
            title: '',
            image: '',
            summary: '',
            healthScore: '',
            steps: [],
            diets: [],
            numSteps: 0,
        });
        setErrors({
            title: '',
            image: '',
            summary: '',
            healthScore: '',
            steps: '',
            diets: '',
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate the form before saving
        const isFormValid = validateForm(form, setErrors, errors, recipes);

        if (isFormValid) {
            dispatch(addRecipe(form));
            const updatedForm = {
                ...form,
                createdByUser: true
            };

            setForm({
                title: '',
                image: '',
                summary: '',
                healthScore: '',
                steps: [],
                diets: [],
                numSteps: 0,
                createdByUser: true,
            });
        } else {
            alert('Please fix the errors in the form before saving.');
        }
    };

    const handleChangeSteps = (event) => {
        setStepDescription(event.target.value);
    };

    const handleStep = (event) => {
        event.preventDefault();
        if (stepDescription !== '') {
            setForm({
                ...form,
                steps: [
                    ...form.steps,
                    { number: form.numSteps + 1, step: stepDescription },
                ],
                numSteps: form.numSteps + 1,
            });
            setStepDescription('');
        } else {
            alert('Please Put a Step');
        }
    };

    const handleDelete = (event) => {
        event.preventDefault();
    
        if (form.createdByUser) { // Verifica createdByUser antes de realizar el borrado
            setForm({
                ...form,
                steps: [],
            });
        } else {
            alert('You can only delete recipes created by the user.');
        }
    };
    
    const changeHandler = (event) => {
        const value = event.target.value;
    
        if (form.diets.includes(value)) {
            const updatedDiets = form.diets.filter(diet => diet !== value);
            setForm({ ...form, diets: updatedDiets });
        } else {
            const updatedDiets = form.diets.includes("") ? [value] : [...form.diets, value];
            setForm({ ...form, diets: updatedDiets });
        }
    };
    
    return (
        <div>
            <div className={styles.invisible}></div>
            <Link to='/home'>
                <button className={styles.button}>Home</button>
            </Link>
            <h1 className={styles.heading}>CREATE NEW RECIPE</h1>
            <div className={styles.container}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="title">Recipe Name</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        <span className={styles.error}>{errors.title}</span>
                    </div>

                    <div className={styles.inputContainer}>
                        <label htmlFor="image">Image Link</label>
                        <input
                            type="text"
                            name="image"
                            id="image"
                            onChange={handleChange}
                            value={form.image}
                            className={styles.input}
                        />
                        <span className={styles.error}>{errors.image}</span>
                    </div>

                    <div className={styles.inputContainer}>
                        <label htmlFor="summary">Recipe Summary</label>
                        <textarea
                            name="summary"
                            id="summary"
                            cols="40"
                            rows="5"
                            value={form.summary}
                            onChange={handleChange}
                            className={styles.textarea}
                        ></textarea>
                        <span className={styles.error}>{errors.summary}</span>
                    </div>

                    <div className={styles.inputContainer}>
                        <label htmlFor="healthScore">Health Score</label>
                        <input
                            type="number"
                            id="healthScore"
                            name="healthScore"
                            value={form.healthScore}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        <span className={styles.error}>{errors.healthScore}</span>
                    </div>

                    <div className={styles.inputContainer}>
                        <label htmlFor="steps">Step By Step</label>
                        <textarea
                            name="steps"
                            id="steps"
                            cols="40"
                            rows="5"
                            value={stepDescription}
                            onChange={handleChangeSteps}
                            className={styles.textarea}
                        ></textarea>
                        <div className={styles.buttonGroup}>
                            <button
                                onClick={handleStep}
                                className={styles.addButton}
                            >
                                Add
                            </button>
                            <button
                                onClick={handleDelete}
                                className={styles.cleanButton}
                            >
                                Clean
                            </button>
                        </div>
                        <ul className={styles.stepList}>
                            {form.steps?.map((step, index) => (
                                <p key={index}>
                                    <strong>Step {step.number}:</strong> {step.step}
                                </p>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.inputContainer}>
                        <label htmlFor="diets">Diet Type</label>
                        <select
                            name="diets"
                            id="diets"
                            onChange={changeHandler}
                            multiple
                            value={form.diets}
                            className={styles.select}
                        >
                            {allDiets?.map((diet, index) => (
                                <option value={diet.name} key={index}>
                                    {diet.name}
                                </option>
                            ))}
                        </select>
                    </div>
                
                    <div className={styles.buttonContainer}>
                        <button
                            type="submit"
                            className={styles.saveButton}
                        >
                            Save
                        </button>
                        <button onClick={clearForm} className={styles.clearButton}>
                            Clear Form
                        </button>
                    </div>
                </form>
            </div>
            <div className={styles.invisible}></div>
            <div className={styles.invisible}></div>
        </div>
    );
}
