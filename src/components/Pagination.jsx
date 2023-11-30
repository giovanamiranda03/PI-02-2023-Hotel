import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import React from 'react';
import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PageNumber = styled.span`
  margin: 0 5px;
  padding: 8px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: ${(props) => (props.active ? "#F5D156" : "white")};
  color: ${(props) => (props.active ? "white" : "#F5D156")};

  &:hover {
    background-color: #F5D156;
    color: white;
  }
`;

const PaginationButton = styled.button`
  margin: 0 5px;
  padding: 4px;
  cursor: pointer;
  border: 2px solid #F5D156;
  border-radius: 4px;
  background-color: transparent;
  color: #F5D156;
  font-size: 16px;

  &:disabled {
    background-color: transparent;
    border: 2px solid #ccc;
    color: white;
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: #F5D156;
    color: white;
  }
`;


const Pagination = ({ page = 1, totalPages, onNextPage, onPreviousPage, onPageChange }) => {
  const handleNextPage = () => {
    if (onNextPage) {
      onNextPage();
    }
  };

  const handlePreviousPage = () => {
    if (onPreviousPage) {
      onPreviousPage();
    }
  };

  const handlePageChange = (pageNumber) => {
    if (onPageChange) {
      onPageChange(pageNumber);
    }
  };

  const renderPageNumbers = () => {
    if (!totalPages) {
      return null;
    }

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
      <PaginationContainer>
        {pages.map((pageNumber) => (
          <PageNumber
            key={pageNumber}
            className={pageNumber === page ? 'active' : ''}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </PageNumber>
        ))}
      </PaginationContainer>
    );
  };

  return (
    <PaginationContainer>
      <PaginationButton onClick={handlePreviousPage} disabled={page === 1}>
        <CaretLeft size={24} />
      </PaginationButton>
      {renderPageNumbers()}
      <PaginationButton onClick={handleNextPage} disabled={page === totalPages}>
        <CaretRight size={24} />
      </PaginationButton>
    </PaginationContainer>
  );
};
export default Pagination;


