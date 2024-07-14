import { useState, useEffect } from "react";

const GetAutores = () => {
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAutores = async () => {
      try {
        const response = await fetch("https://localhost:7045/api/Autor");
        if (!response.ok) {
          throw new Error("Error fetching autores");
        }
        const data = await response.json();
        setAutores(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAutores();
  }, []);

  return { autores, loading, error };
};

export default GetAutores;
