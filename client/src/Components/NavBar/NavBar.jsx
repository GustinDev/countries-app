import { React } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
//Importamos las acciones.
import { getCountries, getCountriesByName } from '../../redux/actions/actions';
//Styles
import s from './NavBar.module.css';
import logo from '../../images/home.png';

export default function NavBar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getCountries());
  }

  function handleInputChange(e) {
    dispatch(getCountriesByName(e));
    setCurrentPage(1);
  }

  return (
    <div className={s.navbar}>
      <Link to='/home' className={s.navbar2}>
        <img
          className={s.bothome}
          onClick={(e) => handleClick(e)}
          src={logo}
          alt='logo'
          width={40}
          height={40}
        ></img>
        <h3>Global Wiki</h3>
      </Link>
      <div className={s.contSearch}>
        <input
          className={s.searchinp}
          value={name}
          type='text'
          placeholder='🔎Escribe un pais que deseas buscar...'
          onChange={(e) => {
            setName(e.target.value);
            handleInputChange(e.target.value);
          }}
        />
        <Link to='/activities'>
          <button className={s.botact}>Crear Actividad</button>
        </Link>
      </div>
    </div>
  );
}
