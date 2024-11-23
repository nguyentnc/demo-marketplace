"use client";
import { Button } from "@/components/Base";
import { ArrowLeftSLineIcon, ArrowRightSLineIcon } from "@/components/Icons";
import debounce from "lodash/debounce";
import { useCallback } from "react";

type Props = {
  pagination: {
    pageCurrent: number;
    totalPage: number;
  };
  onSelect: (page: number) => void;
  lengthRenderBase?: number;
};

const PageItem = ({
  page,
  pageCurrent,
  onClick,
}: {
  page: number;
  pageCurrent: number;
  onClick: () => void;
}) => {
  return (
    <Button
      onClick={onClick}
      theme={pageCurrent === page ? "primary" : "white"}
      variant={pageCurrent === page ? "solid" : "ghost"}
      className="h-8 w-8 !duration-0 sm:h-10 sm:w-10"
    >
      {page}
    </Button>
  );
};

export const Pagination = ({
  pagination,
  onSelect,
  lengthRenderBase = 7,
}: Props) => {
  const { pageCurrent, totalPage } = pagination;
  const handleSelectPage = useCallback(debounce(onSelect, 300), []);
  return (
    <div className="flex select-none items-center space-x-2">
      <Button
        variant="outline"
        className="h-8 w-8 sm:h-10 sm:w-10"
        disabled={pageCurrent === 1}
        onClick={() => pageCurrent > 1 && handleSelectPage(pageCurrent - 1)}
      >
        <ArrowLeftSLineIcon className="h-5 w-5 shrink-0" />
      </Button>
      {Array.from({ length: totalPage }, (v, k) => k + 1).map((page, index) => {
        if (totalPage <= lengthRenderBase) {
          return (
            <PageItem
              onClick={() => handleSelectPage(page)}
              page={page}
              pageCurrent={pageCurrent}
              key={index}
            />
          );
        } else {
          if (pageCurrent <= Math.floor(lengthRenderBase / 2) + 1) {
            if (
              page <= Math.floor(lengthRenderBase / 2) + 2 ||
              page === totalPage
            ) {
              return (
                <PageItem
                  onClick={() => handleSelectPage(page)}
                  page={page}
                  pageCurrent={pageCurrent}
                  key={index}
                />
              );
            }
            if (page === totalPage - 1) {
              return (
                <Button
                  theme="white"
                  variant="ghost"
                  className="h-8 w-8 sm:h-10 sm:w-10"
                  key={index}
                >
                  ...
                </Button>
              );
            }
          } else if (
            pageCurrent >=
            totalPage - Math.floor(lengthRenderBase / 2)
          ) {
            if (
              page === 1 ||
              page >= totalPage - Math.floor(lengthRenderBase / 2) - 1
            ) {
              return (
                <PageItem
                  onClick={() => handleSelectPage(page)}
                  page={page}
                  pageCurrent={pageCurrent}
                  key={index}
                />
              );
            }
            if (page === 2) {
              return (
                <Button
                  theme="white"
                  variant="ghost"
                  className="h-8 w-8 sm:h-10 sm:w-10"
                  key={index}
                >
                  ...
                </Button>
              );
            }
          } else {
            if (
              page === 1 ||
              page === totalPage ||
              page === pageCurrent ||
              page === pageCurrent + 1 ||
              page === pageCurrent - 1
            ) {
              return (
                <PageItem
                  onClick={() => handleSelectPage(page)}
                  page={page}
                  pageCurrent={pageCurrent}
                  key={index}
                />
              );
            }
            if (page === 2 || page === totalPage - 1) {
              return (
                <Button
                  theme="white"
                  variant="ghost"
                  className="h-8 w-8 sm:h-10 sm:w-10"
                  key={index}
                >
                  ...
                </Button>
              );
            }
          }
        }
      })}
      <Button
        variant="outline"
        className="h-8 w-8 sm:h-10 sm:w-10"
        disabled={pageCurrent === totalPage}
        onClick={() =>
          pageCurrent < totalPage && handleSelectPage(pageCurrent + 1)
        }
      >
        <ArrowRightSLineIcon className="h-5 w-5 shrink-0" />
      </Button>
    </div>
  );
};

export default Pagination;
