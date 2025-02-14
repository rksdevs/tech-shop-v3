import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  createColumnHelper,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
import { Check, MoreHorizontal, X } from "lucide-react";
import Container from "../components/Container";
import { Card, CardFooter } from "../components/ui/card";
import { Pagination } from "../components/ui/pagination";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";
import { useGetMyOrdersQuery } from "../Features/orderApiSlice";
import { Helmet } from "react-helmet-async";

const MyOrders = () => {
  const {
    data: allOrders,
    isLoading: productsLoading,
    error: productsError,
  } = useGetMyOrdersQuery();

  const allOrdersData = useMemo(() => {
    return allOrders || [];
  }, [allOrders]);

  // const [] = useDele

  const dispatch = useDispatch();
  const { toast } = useToast();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const navigate = useNavigate();
  const columnHelper = createColumnHelper();
  /** @type import('@tanstack/react-table').columnDef<any>*/
  const columns = [
    columnHelper.accessor((row) => row?._id, {
      // id: "Order Date",
      accessorKey: "orderNo",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Order No
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      //   cell: (info) => <img src={`${info.getValue()}`} alt="product-img" />,
      cell: ({ row }) => (
        <p className="pl-4">
          {row.getValue("orderNo").length > 10
            ? `${row.getValue("orderNo").substring(0, 10)}...`
            : row.getValue("orderNo")}
        </p>
      ),
    }),
    columnHelper.accessor((row) => row.orderItems, {
      id: "Order Items",
      // accessorKey: "name",
      //   cell: (info) => <img src={`${info.getValue()}`} alt="product-img" />,
      cell: (info) => (
        <ul>
          {info.getValue().map((item, index) => (
            <li key={index}>
              <span>{item.qty}</span> X{" "}
              <span>
                {item.name.length > 20
                  ? `${item.name.substring(0, 20)}...`
                  : item.name}
              </span>
            </li>
          ))}
        </ul>
      ),
      className: "hidden sm:table-cell",
    }),
    columnHelper.accessor((row) => row.createdAt, {
      // id: "Order Date",
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Order Date
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      //   cell: (info) => <img src={`${info.getValue()}`} alt="product-img" />,
      cell: ({ row }) => (
        <p className="pl-4">{row.getValue("date").substring(0, 10)}</p>
      ),
      className: "hidden sm:table-cell",
    }),
    columnHelper.accessor((row) => row.totalPrice, {
      // id: "Order Date",
      accessorKey: "totalPrice",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      //   cell: (info) => <img src={`${info.getValue()}`} alt="product-img" />,
      cell: ({ row }) => <p className="pl-4">₹ {row.getValue("totalPrice")}</p>,
    }),
    columnHelper.accessor((row) => row.isPaid, {
      id: "Paid",
      cell: (info) => (
        <div>
          {info.getValue() ? (
            <Check className="h-4 w-4" />
          ) : (
            <X className="h-4 w-4 text-primary" />
          )}
        </div>
      ),
      className: "hidden sm:table-cell",
    }),
    columnHelper.accessor((row) => row.isShipped, {
      id: "Ship",
      cell: (info) => (
        <div>
          {info.getValue() ? (
            <Check className="h-4 w-4" />
          ) : (
            <X className="h-4 w-4 text-primary" />
          )}
        </div>
      ),
      className: "hidden sm:table-cell",
    }),
    columnHelper.accessor((row) => row.isDelivered, {
      id: "Delivery",
      cell: (info) => (
        <div>
          {info.getValue() ? (
            <Check className="h-4 w-4" />
          ) : (
            <X className="h-4 w-4 text-primary" />
          )}
        </div>
      ),
      className: "hidden sm:table-cell",
    }),
    columnHelper.accessor((row) => row._id, {
      id: "Actions",
      cell: (info) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigate(`/myorders/viewOrder/${info.getValue()}`)}
            >
              View
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    }),
  ];

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const allOrderstable = useReactTable({
    data: allOrdersData,
    columns,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      pagination,
      columnFilters,
    },
  });

  return (
    <div className="flex w-full gap-6">
      <Helmet>
        <title>All Orders Page</title>
        <meta name="description" content="Find all your previous orders here" />
        <link rel="canonical" href="/myorders" />
      </Helmet>
      <Container className="flex flex-col gap-4 mt-2">
        <div className="section-heading flex justify-between items-center">
          <h1 className="text-base md:text-[28px] font-extrabold">My Orders</h1>
          <div className="flex md:items-end gap-4">
            <Input
              placeholder="Search by order no..."
              value={
                allOrderstable.getColumn("orderNo")?.getFilterValue() ?? ""
              }
              onChange={(event) =>
                allOrderstable
                  .getColumn("orderNo")
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
        </div>
        <Card>
          <Table>
            <TableHeader>
              {allOrderstable?.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-muted">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={`py-4 first:rounded-none md:first:rounded-tl-lg last:rounded-none md:last:rounded-tr-lg first:pl-3 ${
                        header.column.columnDef.className || ""
                      }`}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {allOrderstable?.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`text-left ${
                        cell.column.columnDef.className || ""
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <CardFooter className="bg-muted p-2 grid md:grid-cols-3 gap-2">
            <div className="flex items-center gap-2">
              <Pagination className="flex gap-2">
                <Button
                  className="border rounded p-2 px-4 px-3"
                  variant="outline"
                  onClick={() => allOrderstable.firstPage()}
                  disabled={!allOrderstable.getCanPreviousPage()}
                >
                  {"<<"}
                </Button>
                <Button
                  className="border rounded p-2 px-4"
                  variant="outline"
                  onClick={() => allOrderstable.previousPage()}
                  disabled={!allOrderstable.getCanPreviousPage()}
                >
                  {"<"}
                </Button>
                <Button
                  className="border rounded p-2 px-4"
                  variant="outline"
                  onClick={() => allOrderstable.nextPage()}
                  disabled={!allOrderstable.getCanNextPage()}
                >
                  {">"}
                </Button>
                <Button
                  className="border rounded p-2 px-4 "
                  variant="outline"
                  onClick={() => allOrderstable.lastPage()}
                  disabled={!allOrderstable.getCanNextPage()}
                >
                  {">>"}
                </Button>
              </Pagination>
            </div>
            <div className="hidden md:flex gap-8">
              <span className="flex items-center gap-1 ">
                <div className="text-sm font-bold">Page</div>
                <strong>
                  {allOrderstable.getState().pagination.pageIndex + 1} of{" "}
                  {allOrderstable.getPageCount().toLocaleString()}
                </strong>
              </span>
              <span className="flex items-center gap-1 text-sm">
                Go to page:
                <Input
                  type="number"
                  defaultValue={
                    allOrderstable.getState().pagination.pageIndex + 1
                  }
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    allOrderstable.setPageIndex(page);
                  }}
                  className="border p-1 rounded w-16"
                />
              </span>
            </div>
            <div className="hidden md:grid md:grid-cols-2">
              <Select
                value={allOrderstable.getState().pagination.pageSize}
                onValueChange={(e) => {
                  allOrderstable.setPageSize(Number(e));
                }}
              >
                <SelectTrigger id="category" aria-label="Select pages">
                  <SelectValue placeholder={"Show"} />
                </SelectTrigger>
                <SelectContent>
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="text-xs text-muted-foreground self-center">
                Showing{" "}
                {allOrderstable.getRowModel().rows.length.toLocaleString()} of{" "}
                {allOrderstable?.getRowModel().rows?.length?.toLocaleString() *
                  allOrderstable.getPageCount().toLocaleString()}{" "}
                Rows
              </div>
            </div>
          </CardFooter>
        </Card>
      </Container>
    </div>
  );
};

export default MyOrders;
