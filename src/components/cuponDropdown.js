import React, { useState, useEffect } from "react";

const CuponDropdown = () => {
  const [cupones, setCupones] = useState([]);

  useEffect(() => {
    // Fetch cupones
    fetch("https://localhost:7266/api/Cupones")
      .then((response) => response.json())
      .then((data) => {
        if (data.isSuccess) {
          setCupones(data.result);
        } else {
          console.error("Error fetching cupones:", data.message);
        }
      })
      .catch((error) => console.error("Error fetching cupones:", error));
  }, []);

  return (
    <div className="max-w-72">
      <select id="cupones" className="w-full p-3 rounded-xl">
        <option value="">Cupones</option>
        {cupones.map((cupon) => (
          <option key={cupon.cuponId} value={cupon.cuponId}>
            {cupon.cuponCode} - {cupon.porcentajeDescuento}%
          </option>
        ))}
      </select>
    </div>
  );
};

export default CuponDropdown;
