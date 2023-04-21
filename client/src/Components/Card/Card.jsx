import React from 'react';
import { Link } from 'react-router-dom';

import s from './Card.module.css';

export default function Card({ flag, name, continent, id }) {
  return (
    <div className={s.cardwrapper}>
      <div className={s.card}>
        <img className={s.imgcard} src={flag} alt='Imagen no encontrada.' />
        <h3>{name}</h3>
        <h5>{continent}</h5>
        <Link to={`/countries/${id}`}>
          <button>+</button>
        </Link>
      </div>
    </div>
  );
}
