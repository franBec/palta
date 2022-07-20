import Tabla from "../../components/mainMenu/tabla";
import useSWR from "swr";

const index = () => {
  const fetchPaltas = async (url) => {
    const res = await fetch(url);
    const resjson = await res.json();
    return resjson;
  };

  const { data, error } = useSWR("api/palta", fetchPaltas);

  const renderContent = () => {
    if (!data) {
      return <div>loading...</div>;
    }

    if (error) {
      return <div>failed to load</div>;
    }
    return <Tabla data={data.data} />;
  };

  return (
    <div className="flex justify-center items-center">{renderContent()}</div>
  );
};

export default index;
