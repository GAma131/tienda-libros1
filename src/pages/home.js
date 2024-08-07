import React, { useEffect, useState } from 'react';
import ProductCart from '../components/productCart';
import Boton from '../components/boton';
import caratulaI from "../assets/images/caratulaIIII.jpg"

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7138/api/LibroMaterial')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const transformedData = data.map(item => ({
          id: item.libreriaMaterialId,
          name: item.titulo,
          price: item.precio,
          image: item.imagenLibro,
          slug: item.libreriaMaterialId
        }));
        setBooks(transformedData);
      })
      .catch(error => {
        console.error('There was an error fetching the books!', error);
      });
  }, []);

  return (
    <div>
      <h1 className='text-3xl my-5'>
        Libros
      </h1>
      <div className='flex mb-3'>
        <Boton texto="Agregar Libro +" redirectTo="/insertLibro" />
      </div>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5'>
        {books.map((book, key) =>
          <ProductCart key={key} data={book} />
        )}
      </div>
    </div>
  );
}

export default Home;
