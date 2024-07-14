import { useState } from "react";

const PostLibro = () => {
  const [formData, setFormData] = useState({
    titulo: "",
    fechaPublicacion: "",
    autorLibro: "",
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
      autorLibro: formData.autorLibro,
    };

    try {
      const response = await fetch("https://localhost:7138/api/LibroMaterial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(libroData),
      });

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
