import React, { useState, useEffect } from "react";
import './SearchForm.css';
//import magnifier from '../../../images/magnifier.svg';
import magn from '../../images/magn.png';

function SearchForm(props) {

  const { makeNewSearch, search, filteredPlants } = props;
  const [newSearch, setNewSearch] = useState('');
  const [noResult, setNoResult] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    makeNewSearch(newSearch);
  }

  useEffect(() => {
    /*console.log(filteredPlants);
    console.log(search);*/
    if (filteredPlants && filteredPlants.length === 0 && search !== "") {
      setNoResult(true)
    }
    else setNoResult(false)
  }, [search, filteredPlants])

  return (
    <section className="searchForm">
      <form 
      className="searchForm__form" 
      onSubmit={handleSubmit}>
        <div className="searchForm__input-container">
          <input 
            className="searchForm__input" 
            type="name" 
            name="search" 
            id="search" 
            placeholder="Например, мандрагора" 
            required 
            value={newSearch} 
            onChange={e => setNewSearch(e.target.value)}
            noValidate/>
          <img 
            className="searchForm__img" 
            src={magn} 
            alt="Лупа">
          </img>
          <button 
            className="searchForm__find-button" 
            type='submit'>
          </button>
        </div>
        {noResult && 
      <>
        <p className="searchForm__text">
          Простите, такого нет. Тут у нас скорее карманный справочник.
        </p>
        <p className="searchForm__text">
          Попробуйте поисковик побольше.
        </p>
      </>      
      }
      </form>
    </section>
  )
}

export default SearchForm;
