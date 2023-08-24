import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import PropTypes from "prop-types";

const PageLinks = ({ current, last, pages, handlePagination }) => {
  return (
    <div className="row my-3 justify-content-center">
      <Pagination aria-label="pagination">
        <PaginationItem disabled={current <= 1}>
          <PaginationLink
            onClick={() => handlePagination(1)}
            first
          />
        </PaginationItem>
        <PaginationItem disabled={current <= 1}>
          <PaginationLink
            onClick={() => handlePagination(current - 1)}
            previous
          />
        </PaginationItem>

        {pages.map((page, i) => (
          <PaginationItem
            key={i}
            active={page === current}
            disabled={page === '...'}
          >
            <PaginationLink onClick={() => handlePagination(page)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem disabled={current >= last}>
          <PaginationLink
            onClick={() => handlePagination(current + 1)}
            next
          />
        </PaginationItem>
        <PaginationItem disabled={current >= last}>
          <PaginationLink
            onClick={() => handlePagination(last)}
            last
          />
        </PaginationItem>
      </Pagination>
    </div>
  );
}

PageLinks.propTypes = {
  current: PropTypes.number.isRequired,
  last: PropTypes.number.isRequired,
  pages: PropTypes.array.isRequired,
  handlePagination: PropTypes.func.isRequired,
}

export default PageLinks;