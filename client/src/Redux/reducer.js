import {
    ADD_RECIPE,
    REMOVE_RECIPE,
    GET_RECIPES,
    FILTER_BY_DIET,
    FILTER_BY_ORIGIN,
    GET_DIETS,
    GET_RECIPE_DETAIL,
    GET_RECIPE_NAME,
    ORDER_BY_NAME,
    ORDER_BY_HEALTHSCORE,
    TOGGLE_DARK_MODE,
    PAGINATION,
} from './actionTypes';

const initialState = {
    recipes: [],
    recipeDetail: [],
    filteredRecipes: [],
    allDiets: [],
    currentPage: 1,
    darkMode: false,
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                filteredRecipes: action.payload,
            };

        case GET_RECIPE_NAME:
            return {
                ...state,
                recipes: action.payload,
            };

        case GET_RECIPE_DETAIL:
            return {
                ...state,
                recipeDetail: action.payload,
            };

        case FILTER_BY_DIET:
            const filtered = state.recipes.filter((recipe) => {
                return recipe.diets.some(
                    (diet) => diet.name === action.payload
                );
            });
            return {
                ...state,
                recipes:
                    action.payload === 'NF'
                        ? [...state.filteredRecipes]
                        : filtered,
            };

        case ORDER_BY_NAME:
            let recipesCopy = [...state.recipes];

            if (action.payload === 'A') {
                recipesCopy.sort((a, b) => {
                    const nameA = a.title.toUpperCase();
                    const nameB = b.title.toUpperCase();

                    if (nameA < nameB) {
                        return -1;
                    }

                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });
            } else if (action.payload === 'D') {
                recipesCopy.sort((a, b) => {
                    const titleA = a.title.toUpperCase();
                    const titleB = b.title.toUpperCase();

                    if (titleA > titleB) {
                        return -1;
                    }
                    if (titleA < titleB) {
                        return 1;
                    }

                    return 0;
                });
            } else {
                recipesCopy = [...state.filteredRecipes];
            }
            return {
                ...state,
                recipes: recipesCopy,
            }

        case ORDER_BY_HEALTHSCORE:
            let recipesOrdered = [...state.recipes];

            if (action.payload === 'A') {
                recipesOrdered.sort((a, b) => a.healthScore - b.healthScore);
            } else if (action.payload === 'D') {
                recipesOrdered.sort((a, b) => b.healthScore - a.healthScore);
            } else {
                recipesOrdered = [...state.filteredRecipes];
            }

            return {
                ...state,
                recipes: recipesOrdered,
            };

        case GET_DIETS:
            return {
                ...state,
                allDiets: action.payload,
            };

        case ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload],
                filteredRecipes: [...state.filteredRecipes, action.payload],
            };

        case REMOVE_RECIPE: 
            const updatedRecipes = state.recipes.filter(recipe => recipe.id !== action.payload);
            const updatedFilteredRecipes = state.filteredRecipes.filter(recipe => recipe.id !== action.payload);

            return {
                ...state,
                recipes: updatedRecipes,
                filteredRecipes: updatedFilteredRecipes,
            };

        case FILTER_BY_ORIGIN:
            let origin = [...state.filteredRecipes];

            if (action.payload === 'API') {
                origin = origin.filter(
                    (recipe) => !String(recipe.id).includes('-')
                );
            } else if (action.payload === 'DB') {
                origin = origin.filter((recipe) =>
                    String(recipe.id).includes('-')
                );
            }

            return {
                ...state,
                recipes:
                    action.payload === 'NF'
                        ? [...state.filteredRecipes]
                        : origin,
            };

        case TOGGLE_DARK_MODE:
            return {
                ...state,
                darkMode: !state.darkMode,
            };
        
        case PAGINATION:

            const pages = {};
            if(action.payload === 'aum') {
                return {
                    ...state,
                    currentPage: state.currentPage + 1,
                }
            } else if (action.payload === 'dim') {
                return {
                    ...state,
                    currentPage: state.currentPage - 1,
                }
            } else {
                return{
                    ...state,
                    currentPage: action.payload
                }
            }
        

        default:
            return {
                ...state
            };
    }
};

export default reducer;