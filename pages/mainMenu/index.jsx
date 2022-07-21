import Tabla from "../../components/mainMenu/tabla";
import useSWRImmutable from "swr/immutable";

const index = () => {
  const fetchPaltas = async (url) => {
    const res = await fetch(url);
    const resjson = await res.json();
    return resjson;
  };

  const { data, error } = useSWRImmutable(
    "api/palta?action=findAll",
    fetchPaltas
  );

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
