import React from 'react';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
    pageCount: number;
    handlePageClick: (event: any) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, handlePageClick }) => {

    return (
        <ReactPaginate
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="<"
            pageLinkClassName="px-3  py-2"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            renderOnZeroPageCount={null}
            containerClassName='flex items-center justify-center space-x-2 text-lg my-4'
            pageClassName='py-2 rounded-md text-unno_pr-500 hover:bg-gray-200'
            activeClassName='bg-unno_sc-500 text-gray-800'
        />
    );
};

export default Pagination;
