// src/Boton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Boton = ({ texto, redirectTo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(redirectTo);
  };

  return (
    <button 
        className='bg-sky-500 p-3 rounded-xl text-md text-white font-bold hover:bg-gray-400 flex gap-2' 
        onClick={handleClick}
    >
      {texto}
    </button>
  );
};

Boton.defaultProps = {
  texto: 'Botón',
  redirectTo: '/'
};

export default Boton;
