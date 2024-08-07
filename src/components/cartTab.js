import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleStatusTab, clearCart } from "../stores/cart";
import CartItem from "./cartItem";
import Boton from "./boton";
import CuponDropdown from "./cuponDropdown";

const CartTab = () => {
  const carts = useSelector((store) => store.cart.items);
  const statusTab = useSelector((store) => store.cart.statusTab);
  const dispatch = useDispatch();

  const [booksIdList, setBooksIdList] = useState([]);
  const [itemPrices, setItemPrices] = useState({});
  const [discount, setDiscount] = useState(0); // Estado para manejar el descuento
  const [selectedCupon, setSelectedCupon] = useState(null);

  useEffect(() => {
    const bookIds = carts.map(item => item.productId);
    setBooksIdList(bookIds);
  }, [carts]);

  useEffect(() => {
    if (carts.length === 0) {
      // Si no hay libros en el carrito, aseguramos que el precio total sea 0
      setItemPrices({});
    }
  }, [carts]);

  const handleCloseTabCart = () => {
    dispatch(toggleStatusTab());
  };

  const handleCheckout = async () => {
    if (booksIdList.length > 0) {
      const payload = {
        productoLista: booksIdList
      };

      try {
        const response = await fetch('https://localhost:7075/api/CarritoCompras', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Respuesta del servidor:", data);

        // Limpiar el carrito tras un checkout exitoso
        dispatch(clearCart());

        // Limpiar el estado de itemPrices y discount
        setItemPrices({});
        setDiscount(0);
      } catch (error) {
        console.error("Error al hacer el POST:", error);
      }
    } else {
      console.warn("No hay libros en el carrito para hacer checkout.");
    }
  };

  const handlePriceChange = useCallback((productId, price) => {
    setItemPrices((prevPrices) => ({
      ...prevPrices,
      [productId]: price
    }));
  }, []);

  const handleApplyCoupon = async () => {
    if (selectedCupon) {
      try {
        const response = await fetch(`https://localhost:7266/api/Cupones/id: int?id=${selectedCupon}`);
        const data = await response.json();
        if (data.isSuccess) {
          setDiscount(data.result.porcentajeDescuento);
        } else {
          console.error("Error fetching cupon:", data.message);
        }
      } catch (error) {
        console.error("Error fetching cupon:", error);
      }
    }
  };

  const totalPrice = useMemo(() => {
    if (carts.length === 0) return 0;
    const total = Object.values(itemPrices).reduce((acc, price) => acc + price, 0);
    const discountAmount = (total * discount) / 100;
    return total - discountAmount;
  }, [itemPrices, discount, carts]);

  return (
    <div
      className={`fixed top-0 right-0 bg-gray-700 shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_60px] 
    transform transition-transform duration-500
    ${statusTab === false ? "translate-x-full" : ""}`}
    >
      <h2 className="p-5 text-white text-2xl">Shopping Cart</h2>
      <div className="p-5 h-fit">
        {carts.map((item, key) => (
          <CartItem key={key} data={{ ...item, onPriceChange: handlePriceChange }}></CartItem>
        ))}
        <div className="flex mt-4 w-full justify-center">
          <CuponDropdown onSelectCoupon={setSelectedCupon} />
          <button
            onClick={handleApplyCoupon}
          >
            <Boton texto="Aplicar"/>
          </button>
          <button onClick={handleCloseTabCart} className="">
            <Boton texto="Nuevo" redirectTo="/insertCupon" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 h-[70px]">
        <button className="bg-black text-white" onClick={handleCloseTabCart}>
          CLOSE
        </button>
        <button className="bg-amber-600 text-white" onClick={handleCheckout}>
          CHECKOUT (${totalPrice.toFixed(2)})
        </button>
      </div>
    </div>
  );
};

export default CartTab;
