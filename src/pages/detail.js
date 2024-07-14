import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../stores/cart";
import GetLibros from "../actions/insertLibro/getLibro";


const Detail = () => {
  const { slug } = useParams();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const {books, loading, error} = GetLibros(slug)

  const handleMinusQuantity = () => {
    setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
  };

  const handlePlusQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (books) {
      dispatch(addToCart({
        productId: books.id,
        quantity: quantity
      }));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!books) return <div>No detail found</div>;

  return (
    <div>
      <h2 className="text-3xl text-center">DETALLES</h2>
      <div className="grid grid-cols-2 gap-5 mt-5">
        <div>
          <img src={books.image} alt="" className="w-full" />
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl uppercase font-bold">{books.name}</h1>
          <p className="font-bold text-3xl">${books.price}</p>
          <div className="flex gap-5">
            <div className="flex gap-2 justify-center items-center">
              <button
                className="bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center"
                onClick={handleMinusQuantity}
              >
                -
              </button>
              <span className="bg-gray-200 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center">
                {quantity}
              </span>
              <button
                className="bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center"
                onClick={handlePlusQuantity}
              >
                +
              </button>
            </div>
            <button className="bg-slate-900 text-white px-7 py-3 rounded-xl shadow-2xl" onClick={handleAddToCart}>
              Add to cart
            </button>
          </div>
          <p>Publicación: {books.description}</p>
          <p>Autor: {books.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
