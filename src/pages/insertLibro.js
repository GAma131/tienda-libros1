import React, { useState, useEffect } from "react";
import PostLibro from "../actions/postLibro";
import GetAutores from "../actions/getAutores";
import Boton from "../components/boton";

const InsertLibro = () => {
  const { autores, loading, error } = GetAutores();
  
  const [coverUrl, setCoverUrl] = useState("");
  
  const { formData, handleChange, handleSubmit } = PostLibro(coverUrl);
  
  useEffect(() => {
    const handleSearchCover = async () => {
      if (formData.titulo) {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=intitle:${formData.titulo}`
        );
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          const coverImage = data.items[0].volumeInfo.imageLinks?.thumbnail;
          setCoverUrl(coverImage || "https://th.bing.com/th/id/R.caae90cb49ed26c1c65f4f7fe4548c8d?rik=zPZ8B2KF9kG2Dw&riu=http%3a%2f%2febooklaunch.com%2fwp-content%2fuploads%2f2014%2f06%2fEbookLaunch_ebook-cover-design_PRE-MADE_500x800_039_Generic.jpg&ehk=OFi4DY6gyN58SyM7npZSGtocMootNJeWn94T%2bxXhjlQ%3d&risl=&pid=ImgRaw&r=0");
        } else {
          setCoverUrl(
            "https://th.bing.com/th/id/R.caae90cb49ed26c1c65f4f7fe4548c8d?rik=zPZ8B2KF9kG2Dw&riu=http%3a%2f%2febooklaunch.com%2fwp-content%2fuploads%2f2014%2f06%2fEbookLaunch_ebook-cover-design_PRE-MADE_500x800_039_Generic.jpg&ehk=OFi4DY6gyN58SyM7npZSGtocMootNJeWn94T%2bxXhjlQ%3d&risl=&pid=ImgRaw&r=0"
          );
        }
      } else {
        setCoverUrl(""); // Si no hay título, se borra la URL de la portada
      }
    };

    handleSearchCover();
  }, [formData.titulo]);

  return (
    <div className="flex">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg p-6 border h-screen flex-1"
      >
        <h1 className="font-bold text-3xl mb-5">Agregar libro</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Título:</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Fecha de Publicación:
          </label>
          <input
            type="date"
            name="fechaPublicacion"
            value={formData.fechaPublicacion}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Precio:
          </label>
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Autor del Libro:
          </label>
          <div className="flex">
            <select
              name="autorLibro"
              value={formData.autorLibro}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {loading && <option>Cargando autores...</option>}
              {error && <option>Error al cargar autores</option>}
              <option value="">Selecciona un Autor</option>
              {autores.map((autor) => (
                <option key={autor.autorLibroGuid} value={autor.autorLibroGuid}>
                  {autor.nombre} {autor.apellido}
                </option>
              ))}
            </select>
            <Boton texto="Nuevo+" redirectTo="/insertAutor" />
          </div>
        </div>
        <div>
          {coverUrl && (
            <div className="flex justify-center items-center ml-4">
              <img
                src={coverUrl}
                name="imagenLibro"
                value={formData.imagenLibro}
                alt="Book cover"
                className="w-40 h-auto border border-black"
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          Agregar
        </button>
      </form>
    </div>
  );
};

export default InsertLibro;
