import PaginateLI from './paginateLI'
import PaginateArrow from './paginateArrow'

const PaginateNavbar = ({ currentPage, totalPages, handleClick }) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex items-center space-x-4">
        <PaginateArrow
          isPaginateBack={true}
          currentPage={currentPage}
          handleClick={handleClick}
        />
        <div className="flex flex-wrap">
          {[...Array(totalPages).keys()].map((it) => (
            <PaginateLI
              key={it + 1}
              number={it + 1}
              isOn={currentPage == it + 1}
              handleClick={handleClick}
            />
          ))}
        </div>
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
