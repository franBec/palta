import { useEffect, useState } from "react";
import Tabla from "../../components/mainMenu/tabla";

const index = () => {
  const [paltas, setPaltas] = useState([
    {
      _id: 1,
      data: {
        nombre: "Méndez",
        origen: "México",
      },
    },
    {
      _id: 2,
      data: {
        nombre: "Criollo",
        origen: "México",
      },
    },
  ]);

  useEffect(() => {
    async function fetchPaltas() {
      const res = await fetch("/api/palta");
      const data = await res.json();
      setPaltas(data.data);
    }

    fetchPaltas();
  }, []);

  return (
    <>
      <Tabla data={paltas} />
    </>
  );
};

export default index;
