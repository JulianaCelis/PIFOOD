import {
    GET_RECIPES,
    GET_RECIPE_NAME,
    GET_RECIPE_DETAIL,
    FILTER_BY_DIET,
    ORDER_BY_NAME,
    ORDER_BY_HEALTHSCORE,
    GET_DIETS,
    ADD_RECIPE,
    REMOVE_RECIPE,
    FILTER_BY_ORIGIN,
    TOGGLE_DARK_MODE,
    PAGINATION,
    SET_ERROR,
} from './actionTypes';
import axios from 'axios';

const URL = 'http://localhost:3001'


//action que obtiene todas las recetas
export const getRecipes = () => {
    return async (dispatch) => {
        const response = await axios.get(`/recipes`);

        return dispatch({
            type: GET_RECIPES,
            payload: response.data,
        });
    };
};

//Obtener las recetas por nombre 
export const getRecipeName = (name) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/recipes/name?name=${name}`);
    
            return dispatch({
                type: GET_RECIPE_NAME,
                payload: response.data,
            });

        }catch(error){
            alert('No existe esa receta')
        }
    };
};

export const recipeDetail = (detailId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/recipes/${detailId}`);
            return dispatch({
                type: GET_RECIPE_DETAIL,
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: SET_ERROR,
                payload: 'Error al obtener el detalle de la receta', 
            });
        }
    };
};

export const filterByDiet = (diet) => {
    return async (dispatch) => {
        return dispatch({
            type: FILTER_BY_DIET,
            payload: diet,
        });
    };
};

export const orderByName = (order) => {
    return {
        type: ORDER_BY_NAME,
        payload: order,
    };
};

export const orderByHealthScore = (order) => {
    return {
        type: ORDER_BY_HEALTHSCORE,
        payload: order,
    };
};

export const getDiets = () => {
    return async (dispatch) => {
        const response = await axios.get(`/diets`);
        return dispatch({
            type: GET_DIETS,
            payload: response.data,
        });
    };
};

export const addRecipe = (form) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`/recipes`, form);

            alert('You Recipe Has Been Created Successfully');

            return dispatch({
                type: ADD_RECIPE,
                payload: response.data,
            });
        } catch (error) {
          alert('the recipe could not be created')
        }
    };
};

export const removeRecipe = (recipeId) => {
    return async (dispatch) => {
        try {
            await axios.delete(`/recipes/${recipeId}`);

            // Luego de eliminar la receta, podrías realizar una acción adicional si es necesario,
            // como recargar la lista de recetas o redirigir a otra página.

            return dispatch({
                type: REMOVE_RECIPE,
                payload: recipeId, // Enviamos el ID de la receta eliminada al reducer
            });
        } catch (error) {
            alert('Error al eliminar la receta');
        }
    };
};

export const filterByOrigin = (origin) => {
    return async (dispatch) => {
        return dispatch({
            type: FILTER_BY_ORIGIN,
            payload: origin,
        });
    };
};

export const toggleDarkMode = () => {
    return {
        type: TOGGLE_DARK_MODE,
    }
}

export const setCurrentPage = (page) => {
    return {
        type: PAGINATION,
        payload: page,
    }
}