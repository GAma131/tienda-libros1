import React from "react";
import PostCupon from "../actions/insertCupon/postCupon";

const InsertCupon = () => {
  const { formData, handleChange, handleSubmit } = PostCupon();
  return (
      <form onSubmit={handleSubmit} className="max-w-md p-2">
        <h1 className="font-bold text-3xl mb-5">Agregar libro</h1>
        <div className="mb-4">
          <label className="font-bold">Código:</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="w-full px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <div className="mb-4">
          <label className="font-bold">Porcentaje de descuento:</label>
          <input
            type="text"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            className="w-full px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"

          />
        </div>
        <div className="mb-4">
          <label className="font-bold">Porcentaje mínimo:</label>
          <input
            type="text"
            name="minDiscount"
            value={formData.minDiscount}
            onChange={handleChange}
            className="w-full px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"

          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
          Crear
        </button>
      </form>
  );
};

export default InsertCupon;
