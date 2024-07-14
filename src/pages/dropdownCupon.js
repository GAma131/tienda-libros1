import React from "react";
import GetCupones from "../actions/insertCupon/getCupon";

const DropdownCupon = () => {
  const { cupones, loading, error } = GetCupones();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <select
      name="autorLibro"
      className=" w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
    >
      {loading && <option>Cargando autores...</option>}
      {error && <option>Error al cargar autores</option>}
      {cupones.map((cupon) => (
        <option key={cupon.cuponId} value={cupon.cuponId}>
          {cupon.cuponCode} {cupon.cuponCode}
        </option>
      ))}
    </select>
  );
};

export default DropdownCupon;
