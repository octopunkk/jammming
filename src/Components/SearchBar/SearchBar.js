import './SearchBar.css';
import React, { useState } from 'react';

export function SearchBar(props){
    const[searchTerm, setSearchTerm]=useState('');
    let search = () => {
        props.onSearch(searchTerm)
    }
    let handleTermChange = event => {
        setSearchTerm(event.target.value)
    }
    let handleKeyDown = event => {
        if (event.charCode === 13) {
            search();
        }
    }
    return(
        <div className="SearchBar">
            <input placeholder="Enter A Song, Album, or Artist" onChange={handleTermChange} value={searchTerm} onKeyPress={handleKeyDown}/>
            <button className="SearchButton" onClick={search}>SEARCH</button>
        </div>
    )
};

export default SearchBar;