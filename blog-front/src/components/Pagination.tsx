import React, { useState } from "react";
import { Button } from "@nextui-org/react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-4">
      <Button
        variant="flat"
        color="secondary"
        isDisabled={currentPage === 1}
        onClick={handlePrevious}
        size="sm"
      >
        上一页
      </Button>
      <Button
        size="sm"
        variant="flat"
        color="secondary"
        isDisabled={currentPage === totalPages}
        onClick={handleNext}
      >
        下一页
      </Button>
    </div>
  );
};

export default Pagination;
