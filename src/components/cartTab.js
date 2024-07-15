import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleStatusTab } from "../stores/cart";
import CartItem from "./cartItem";
import Boton from "./boton";
import CuponDropdown from "./cuponDropdown";

const CartTab = () => {
  // Obtener items del carrito desde Redux
  const carts = useSelector((store) => store.cart.items);
  const statusTab = useSelector((store) => store.cart.statusTab);
  const dispatch = useDispatch();

  const handleCloseTabCart = () => {
    dispatch(toggleStatusTab());
  };

  return (
    <div
      className={`fixed top-0 right-0 bg-gray-700 shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_60px] 
    transform transition-transform duration-500
    ${statusTab === false ? "translate-x-full" : ""}`}
    >
      <h2 className="p-5 text-white text-2xl">Shopping Cart</h2>
      <div className="p-5 h-fit">
        {carts.map((item, key) => (
          <CartItem key={key} data={item}></CartItem>
        ))}
        <div className="flex mt-4 w-full justify-center">
          <CuponDropdown />
          <button onClick={handleCloseTabCart} className="">
            <Boton texto="Nuevo" redirectTo="/insertCupon" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 h-[70px]">
        <button className="bg-black text-white" onClick={handleCloseTabCart}>
          CLOSE
        </button>
        <button className="bg-amber-600 text-white">CHECKOUT</button>
      </div>
    </div>
  );
};

export default CartTab;
