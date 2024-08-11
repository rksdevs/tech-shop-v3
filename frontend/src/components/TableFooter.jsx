import React from "react";
import { CardFooter } from "./ui/card";
import { Pagination } from "./ui/pagination";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const TableFooter = ({ allProductstable }) => {
  return (
    <CardFooter className="bg-muted p-2 flex justify-center md:justify-between gap-2 px-4 rounded-none md:rounded-b-lg">
      <div className="flex items-center gap-2">
        <Pagination className="flex gap-2">
          <Button
            className="border rounded p-2 px-4 px-3"
            variant="outline"
            onClick={() => allProductstable.firstPage()}
            disabled={!allProductstable.getCanPreviousPage()}
          >
            {"<<"}
          </Button>
          <Button
            className="border rounded p-2 px-4"
            variant="outline"
            onClick={() => allProductstable.previousPage()}
            disabled={!allProductstable.getCanPreviousPage()}
          >
            {"<"}
          </Button>
          <Button
            className="border rounded p-2 px-4"
            variant="outline"
            onClick={() => allProductstable.nextPage()}
            disabled={!allProductstable.getCanNextPage()}
          >
            {">"}
          </Button>
          <Button
            className="border rounded p-2 px-4 "
            variant="outline"
            onClick={() => allProductstable.lastPage()}
            disabled={!allProductstable.getCanNextPage()}
          >
            {">>"}
          </Button>
        </Pagination>
      </div>
      <div>
        <span className="hidden md:flex items-center gap-1 ">
          <strong>
            Page - {allProductstable.getState().pagination.pageIndex + 1} of{" "}
            {allProductstable.getPageCount().toLocaleString()}
          </strong>
        </span>
      </div>
      <div className="hidden md:flex gap-8">
        <span className="flex items-center gap-1 text-sm">
          Go to page:
          <Input
            type="number"
            defaultValue={allProductstable.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              allProductstable.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
      </div>
    </CardFooter>
  );
};

export default TableFooter;
