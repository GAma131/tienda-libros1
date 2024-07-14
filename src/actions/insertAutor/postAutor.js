import { useState } from 'react';

const PostAutor = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    fechaNaci: '',
    //imgData: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const autorData = {
      nombre: formData.nombre,
      apellidos: formData.apellidos,
      fechaNacimiento: formData.fechaNaci,
      //imgData: formData.imgData
    };

    try {
      const response = await fetch('https://localhost:7045/api/Autor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(autorData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Autor submitted successfully:', result);
      } else {
        const errorText = await response.text();
        throw new Error(errorText);
      }
    } catch (error) {
      console.error('Error submitting autor:', error);
    }
  };

  return { formData, handleChange, handleSubmit };
};

export default PostAutor;
