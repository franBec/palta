import { GiAvocado } from "react-icons/gi";

const AvocadoLoading = () => {
    return (
        <div role="status" className="h-screen flex justify-center items-center bg-transparent">
          <svg aria-hidden="true" className="flex justify-center text-lime-500 items-center mr-2 w-8 h-8 animate-spin " viewBox="0 0 50 50" style={{width: "150px", height: "150px"}}>
            <GiAvocado />
          </svg>
        </div>
    );
  };
  
export default AvocadoLoading;
  