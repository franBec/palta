import { useEffect, useState } from "react";
import Tabla from "../../components/mainMenu/tabla";

const index = () => {
  const [paltas, setPaltas] = useState([]);

  useEffect(() => {
    async function fetchPaltas() {
      const res = await fetch("/api/palta");
      const data = await res.json();
      setPaltas(data.data);
    }

    fetchPaltas();
  }, []);

  return (
    <div className="flex justify-center items-center">
      <Tabla data={paltas} />
    </div>
  );
};

export default index;
