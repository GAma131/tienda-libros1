import { useState } from "react";

const PostLibro = (coverUrl) => {
  const [formData, setFormData] = useState({
    titulo: "",
    fechaPublicacion: "",
    precio: "",
    autorLibro: "",
    imagenLibro: "", // Asegúrate de que coincida con el nombre en InsertLibro
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

    const libroData = {
      titulo: formData.titulo,
      fechaPublicacion: new Date(formData.fechaPublicacion).toISOString(),
      precio: formData.precio,
      autorLibro: formData.autorLibro,
      imagenLibro: coverUrl
    };

    try {
      const response = await fetch("https://localhost:7138/api/LibroMaterial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(libroData),
      });
      console.log(libroData);

      if (response.ok) {
        const result = await response.json();
        console.log("Libro submitted successfully:", result);
      } else {
        const errorText = await response.text();
        throw new Error(errorText);
      }
    } catch (error) {
      console.error("Error submitting libro:", error);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};

export default PostLibro;
