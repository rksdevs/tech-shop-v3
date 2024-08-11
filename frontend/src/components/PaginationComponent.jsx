import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { useEffect } from "react";
import { Button } from "./ui/button";

const PaginationComponent = ({
  currentPage,
  totalPages,
  variant,
  isAdmin = false,
  keyword,
}) => {
  // const location = useLocation();
  // const navigate = useNavigate();
  // const [searchParams] = useSearchParams();
  // const page = currentPage || searchParams.get("page") || 1;

  // const handlePageChange = (page) => {
  //   navigate();
  // };
  const renderPaginationItems = () => {
    const paginationItems = [];

    // Always add the first page
    paginationItems.push(
      <PaginationItem key={1}>
        <PaginationLink
          href={
            !isAdmin
              ? keyword
                ? `/search/${keyword}/page/${1}`
                : `/allproducts/page/${1}`
              : `/admin/all-products/${1}`
          }
          className="h-8 border border-muted-foreground"
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    if (totalPages > 3) {
      if (currentPage > 3) {
        // If current page is beyond the first 3 pages, show ellipsis
        paginationItems.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis className="h-8" />
          </PaginationItem>
        );
      }

      // Determine the start and end range for the pagination items
      const startPage = Math.max(currentPage - 1, 2);
      const endPage = Math.min(currentPage + 1, totalPages - 1);

      for (let i = startPage; i <= endPage; i++) {
        paginationItems.push(
          <PaginationItem key={i}>
            <PaginationLink
              href={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${i}`
                    : `/allproducts/page/${i}`
                  : `/admin/all-products/${i}`
              }
              className="h-8 border border-muted-foreground"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage + 1 < totalPages - 1) {
        // If current page is not within the last 3 pages, show ellipsis
        paginationItems.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Always add the last page
      paginationItems.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${totalPages}`
                  : `/allproducts/page/${totalPages}`
                : `/admin/all-products/${totalPages}`
            }
            className="h-8 border border-muted-foreground"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    } else {
      // If total pages are 3 or less, show all pages
      for (let i = 2; i <= totalPages; i++) {
        paginationItems.push(
          <PaginationItem key={i}>
            <PaginationLink
              href={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${i}`
                    : `/allproducts/page/${i}`
                  : `/admin/all-products/${i}`
              }
              className="h-8 border border-muted-foreground"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return paginationItems;
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem key="prev">
          <PaginationPrevious
            className="hidden md:flex md:text-sm"
            href={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${currentPage - 1}`
                  : `/allproducts/page/${currentPage - 1}`
                : `/admin/all-products/${currentPage - 1}`
            }
          />
        </PaginationItem>
        {renderPaginationItems()}
        <PaginationItem key="next">
          <PaginationNext
            className="hidden md:flex text-xs md:text-sm"
            href={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${currentPage + 1}`
                  : `/allproducts/page/${currentPage + 1}`
                : `/admin/all-products/${currentPage + 1}`
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
