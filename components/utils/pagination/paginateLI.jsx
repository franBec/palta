const PaginateLI = ({ number, isOn, handleClick }) => {
  return (
    <li
      className={
        isOn
          ? "z-10  py-2 px-3 leading-tight border-2 border-lime-700 bg-lime-200 hover:bg-lime-400 p-2  rounded-lg"
          : "py-2 px-3 leading-tight border-2 border-lime-300 bg-lime-200 hover:bg-lime-400 p-2  rounded-lg"
      }
      onClick={() => handleClick(number)}
    >
      {number}
    </li>
  );
};

export default PaginateLI;
