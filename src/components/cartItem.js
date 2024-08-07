import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { changeQuantity } from "../stores/cart";
import GetLibros from "../actions/getLibro";

const CartItem = (props) => {
  const { productId, quantity, onPriceChange } = props.data;
  const dispatch = useDispatch();
  const { books, loading, error } = GetLibros(productId);

  const handleMinusQuantity = () => {
    dispatch(changeQuantity({
      productId: productId,
      quantity: quantity - 1
    }));
  };

  const handlePlusQuantity = () => {
    dispatch(changeQuantity({
      productId: productId,
      quantity: quantity + 1
    }));
  };

  useEffect(() => {
    if (books) {
      const totalItemPrice = (books.price || 0) * quantity;
      onPriceChange(productId, totalItemPrice);
    }
  }, [books, quantity, onPriceChange, productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!books) return <div>No detail found</div>;

  const totalItemPrice = (books.price || 0) * quantity;

  return (
    <div className="flex justify-between items-center bg-slate-600 text-white p-2 border-b-2 border-slate-700 gap-5 rounded-md">
      <img src={books.image} alt="" className="w-12" />
      <h3>{books.name}</h3>
      <p>${totalItemPrice.toFixed(2)}</p>
      <div className="w-20 flex justify-between gap-2">
        <button className="bg-gray-200 rounded-full w-6 h-6 text-cyan-600" onClick={handleMinusQuantity}>-</button>
        <span>{quantity}</span>
        <button className="bg-gray-200 rounded-full w-6 h-6 text-cyan-600" onClick={handlePlusQuantity}>+</button>
      </div>
    </div>
  );
};

export default CartItem;
