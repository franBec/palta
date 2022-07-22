const PaginateArrow = ({ isPaginateBack, currentPage, handleClick }) => {
  return (
    <li
      className={`${
        isPaginateBack ? "block rounded-l-lg" : "block rounded-r-lg"
      } py-2 px-3 leading-tight border-2 border-lime-300 bg-lime-200 hover:bg-lime-400 p-2  rounded-lg `}
      onClick={() =>
        handleClick(isPaginateBack ? currentPage - 1 : currentPage + 1)
      }
    >
      <svg
        className="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d={
            isPaginateBack
              ? "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              : "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          }
          clipRule="evenodd"
        ></path>
      </svg>
    </li>
  );
};

export default PaginateArrow;
