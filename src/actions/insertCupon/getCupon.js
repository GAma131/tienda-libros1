import { useState, useEffect } from "react";

const GetCupones = () => {
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetCupones = async () => {
      try {
        const response = await fetch("https://localhost:7266/api/Cupones");
        if (!response.ok) {
          throw new Error("Error fetching autores");
        }
        const data = await response.json();
        setAutores(data);
        console.log(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetCupones();
  }, []);

  return { autores, loading, error };
};

export default GetCupones;
