import PaginateLI from './paginateLI'
import PaginateArrow from './paginateArrow'

const PaginateNavbar = ({ currentPage, totalPages, handleClick }) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex items-center -space-x-px">
        <PaginateArrow
          isPaginateBack={true}
          currentPage={currentPage}
          handleClick={handleClick}
        />
        {[...Array(totalPages).keys()].map((it) => (
          <PaginateLI
            key={it + 1}
            number={it + 1}
            isOn={currentPage == it + 1}
            handleClick={handleClick}
          />
        ))}
        <PaginateArrow
          isPaginateBack={false}
          currentPage={currentPage}
          handleClick={handleClick}
        />
      </ul>
    </nav>
  )
}

export default PaginateNavbar
