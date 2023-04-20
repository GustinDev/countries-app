import React from 'react';
import { Link } from 'react-router-dom';
import style from './Landing.module.css';

function Landing() {
  return (
    <div className='container'>
      <p>
        <span className={style.fancy}>
          {' '}
          Global <br />{' '}
        </span>{' '}
        WIKI
      </p>
      <Link to='/home'>
        <button className={style.buttonOne}>Let's Go!</button>
      </Link>
    </div>
  );
}

export default Landing;
