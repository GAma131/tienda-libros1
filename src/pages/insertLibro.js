import React from "react";
import PostLibro from "../actions/insertLibro/postLibro";
import GetAutores from "../actions/insertLibro/getAutores";
import Boton from "../components/boton";

const InsertLibro = () => {
  const { formData, handleChange, handleSubmit } = PostLibro();
  const { autores, loading, error } = GetAutores();

  return (
    <form onSubmit={handleSubmit} className="max-w-lg p-6 borde h-screen">
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
            {autores.map((autor) => (
              <option key={autor.autorLibroGuid} value={autor.autorLibroGuid}>
                {autor.nombre} {autor.apellido}
              </option>
            ))}
          </select>
          <Boton texto="Nuevo+" redirectTo="/insertAutor" />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
      >
        Agregar
      </button>
    </form>
  );
};

export default InsertLibro;
