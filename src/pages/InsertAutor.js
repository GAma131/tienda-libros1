import React from 'react';
import PostAutor from '../actions/postAutor';

const InsertAutor = () => {
  const { formData, handleChange, handleSubmit } = PostAutor();

  return (
    <form onSubmit={handleSubmit} className="max-w-lg p-6 borde h-screen">
      <h1 className="font-bold text-3xl mb-5">Nuevo Autor</h1>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Apellidos:</label>
        <input
          type="text"
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Fecha de Nacimiento:</label>
        <input
          type="date"
          name="fechaNaci"
          value={formData.fechaNaci}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>
      {/* <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Imagen:</label>
        <input
          type="text"
          name="imgData"
          value={formData.imgData}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div> */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
      >
        Agregar
      </button>
    </form>
  );
};

export default InsertAutor;
