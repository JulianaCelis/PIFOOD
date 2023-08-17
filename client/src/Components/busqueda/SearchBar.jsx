import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeName, setCurrentPage, getRecipes } from "../../Redux/actions"; 

export default function SearchBar(props) {
    const dispatch = useDispatch();
    const regex = /^[a-zA-Z0-9\s]*$/;
    const [searchValue, setSearchValue] = useState("");
    const [errors, setErrors] = useState(false);

    const handleSearch = () => {
        if (!errors) {
            dispatch(getRecipeName(searchValue));
            dispatch(setCurrentPage(1));
        }
    };

    const handleKeyDown = (event) => {
        if (event.keyCode === 13 && !errors) {
            dispatch(getRecipeName(searchValue));
            dispatch(setCurrentPage(1));
        }
    };

    const handleChange = (event) => {
        const newValue = event.target.value;
        setSearchValue(newValue);

        if (regex.test(newValue)) {
            setErrors(false);
            if (newValue.trim() === "") {
                dispatch(getRecipes()); // Si el valor está vacío, obtén todas las recetas
                dispatch(setCurrentPage(1));
            }
        } else {
            setErrors(true);
        }
    };

    return (
        <div>
            <input
                type="search"
                placeholder="Search recipe by name"
                value={searchValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <button
                onClick={handleSearch}
                disabled={errors}
            >
                Search
            </button>
            {errors && <span>Invalid input</span>}
        </div>
    );
}