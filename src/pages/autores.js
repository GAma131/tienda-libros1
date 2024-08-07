// src/pages/Autores.js
import React, { useEffect, useState } from 'react';
import AutorShow from '../components/autorShow';
import Boton from '../components/boton';

const Autores = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7045/api/Autor')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const transformedData = data.map(item => ({
          id: item.autorLibroId,
          name: item.nombre,
          surname: item.apellido,
          image: `https://randomuser.me/api/portraits/lego/${Math.floor(Math.random() * 10)}.jpg`,
          fechaNaci: item.fechaNacimiento,
          slug: item.autorLibroId
        }));
        setAuthors(transformedData);
      })
      .catch(error => {
        console.error('There was an error fetching the authors!', error);
      });
  }, []);

  return (
    <div>
      <h1 className='text-3xl my-5'>
        Autores
      </h1>
      <div className='flex mb-3'>
        <Boton texto="Agregar Autor +" redirectTo="/insertAutor" />
      </div>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5'>
        {authors.map((author, key) =>
          <AutorShow key={key} data={author} />
        )}
      </div>
    </div>
  );
}

export default Autores;
