// src/components/AutorShow.js
import React from 'react';

const AutorShow = ({ data }) => {
  // Formatear la fecha para mostrar solo el día
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className='border p-3'>
      <img 
        src={data.image} 
        alt={`${data.name} ${data.surname}`} 
        className='w-32 h-32 object-cover rounded-full mx-auto' 
      />
      <h2 className='text-xl mt-2 text-center'>{data.name} {data.surname}</h2>
      <p className='text-sm text-center'>{formatDate(data.fechaNaci)}</p>
    </div>
  );
}

export default AutorShow;
