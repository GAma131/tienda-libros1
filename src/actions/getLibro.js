import { useState, useEffect } from 'react';

const GetLibros = (option) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://localhost:7138/api/LibroMaterial')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const bookDetail = data.find(item => item.libreriaMaterialId === option);
        if (bookDetail) {
          const transformedDetail = {
            id: bookDetail.libreriaMaterialId,
            name: bookDetail.titulo,
            price: bookDetail.precio,
            image: bookDetail.imagenLibro,
            description: bookDetail.fechaPublicacion, // Assuming there's a description field
            slug: bookDetail.libreriaMaterialId,
            autor: bookDetail.autorLibro
          };
          setBooks(transformedDetail);
        } else {
            setBooks(null);
        }
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [option]);

  return { books, loading, error };
}

export default GetLibros;
