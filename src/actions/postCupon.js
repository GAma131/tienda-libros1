import { useState } from "react";

const PostCupon = () => {
    const [formData, setFormData] = useState({
        cuponCode: '',
        porcentajeDescuento: 0,
        descuentominimo: 0,
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const cuponData = {
        cuponCode: formData.code,
        porcentajeDescuento: formData.discount,
        descuentominimo: formData.minDiscount,
        fechaInicio: new Date(),
        fechaVencimiento: formData.vencimiento
      };
  
      try {
        const response = await fetch('https://localhost:7266/api/Cupones', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cuponData),
        });
  
        if (response.ok) {
          const result = await response.json();
          console.log('Cupon submitted successfully:', result);
        } else {
          const errorText = await response.text();
          throw new Error(errorText);
        }
      } catch (error) {
        console.error('Error submitting libro:', error);
      }
    };

    return{
        formData,
        handleChange,
        handleSubmit
    };
};

export default PostCupon