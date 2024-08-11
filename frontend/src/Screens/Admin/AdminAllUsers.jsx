import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
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
import { useToast } from "../../components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import { Check, MoreHorizontal, X } from "lucide-react";
import Container from "../../components/Container";
import { Card, CardFooter } from "../../components/ui/card";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../Features/usersApiSlice";
import { Pagination } from "../../components/ui/pagination";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";

const AdminAllUsers = () => {
  const {
    data: allUsers,
    isLoading: productsLoading,
    error: productsError,
    refetch,
  } = useGetUsersQuery();

  const allUsersData = useMemo(() => {
    return allUsers || [];
  }, [allUsers]);

  const [deleteUser, { isLoading: deleteUserLoading, error: deleteUserError }] =
    useDeleteUserMutation();

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
    columnHelper.accessor((row) => row.name, {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className=""
          >
            Name
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: (info) => <p className="flex pl-4">{info.getValue()}</p>,
    }),
    columnHelper.accessor((row) => row.email, {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className=""
          >
            Email Address
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: (info) => <p className="flex pl-4">{info.getValue()}</p>,
      className: "hidden sm:table-cell",
    }),
    columnHelper.accessor((row) => row.createdAt, {
      accessorKey: "creationDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className=""
          >
            Created On
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: (info) => (
        <p className="flex pl-4">{info.getValue().substring(0, 10)}</p>
      ),
      className: "hidden sm:table-cell",
    }),

    columnHelper.accessor((row) => row.isAdmin, {
      id: "Admin",
      cell: (info) => (
        <div className="pl-4">
          {info.getValue() ? (
            <Check className="h-4 w-4" />
          ) : (
            <X className="h-4 w-4 text-primary" />
          )}
        </div>
      ),
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
            {/* <DropdownMenuItem
              onClick={() =>
                navigate(`/admin/allusers/editUser/${info.getValue()}`)
              }
            >
              Edit
            </DropdownMenuItem> */}
            <DropdownMenuItem
              onClick={(e) => handleDeleteUser(e, info.getValue())}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    }),
  ];

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const allUserstable = useReactTable({
    data: allUsersData,
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

  const handleDeleteUser = async (e, brandId) => {
    e.preventDefault();
    try {
      await deleteUser(brandId).unwrap();
      refetch();
      toast({
        title: "User deleted!",
      });
    } catch (error) {
      toast({
        title: "Error deleting brand!",
        description: error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex w-full gap-6">
      <Container className="flex flex-col gap-4">
        <div className="section-heading flex mt-4 justify-between items-center">
          <h1 className="text-base md:text-[28px] font-extrabold">Users</h1>
          <div className="flex gap-4">
            <Input
              placeholder="Search by name..."
              value={allUserstable.getColumn("name")?.getFilterValue() ?? ""}
              onChange={(event) =>
                allUserstable
                  .getColumn("name")
                  ?.setFilterValue(event.target.value)
              }
              className="hidden md:flex max-w-sm"
            />
            <Input
              placeholder="Search by email..."
              value={allUserstable.getColumn("email")?.getFilterValue() ?? ""}
              onChange={(event) =>
                allUserstable
                  .getColumn("email")
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
        </div>
        <Card className="rounded-none md:rounded-lg min-h-[54vh] flex flex-col justify-between">
          <Table>
            <TableHeader>
              {allUserstable?.getHeaderGroups().map((headerGroup) => (
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
              {allUserstable?.getRowModel().rows.map((row) => (
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
                  onClick={() => allUserstable.firstPage()}
                  disabled={!allUserstable.getCanPreviousPage()}
                >
                  {"<<"}
                </Button>
                <Button
                  className="border rounded p-2 px-4"
                  variant="outline"
                  onClick={() => allUserstable.previousPage()}
                  disabled={!allUserstable.getCanPreviousPage()}
                >
                  {"<"}
                </Button>
                <Button
                  className="border rounded p-2 px-4"
                  variant="outline"
                  onClick={() => allUserstable.nextPage()}
                  disabled={!allUserstable.getCanNextPage()}
                >
                  {">"}
                </Button>
                <Button
                  className="border rounded p-2 px-4 "
                  variant="outline"
                  onClick={() => allUserstable.lastPage()}
                  disabled={!allUserstable.getCanNextPage()}
                >
                  {">>"}
                </Button>
              </Pagination>
            </div>
            <div className="hidden md:flex gap-8">
              <span className="flex items-center gap-1 ">
                <div className="text-sm font-bold">Page</div>
                <strong>
                  {allUserstable.getState().pagination.pageIndex + 1} of{" "}
                  {allUserstable.getPageCount().toLocaleString()}
                </strong>
              </span>
              <span className="flex items-center gap-1 text-sm">
                Go to page:
                <Input
                  type="number"
                  defaultValue={
                    allUserstable.getState().pagination.pageIndex + 1
                  }
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    allUserstable.setPageIndex(page);
                  }}
                  className="border p-1 rounded w-16"
                />
              </span>
            </div>
            <div className="hidden md:grid md:grid-cols-2">
              <Select
                value={allUserstable.getState().pagination.pageSize}
                onValueChange={(e) => {
                  allUserstable.setPageSize(Number(e));
                }}
              >
                <SelectTrigger id="category" aria-label="Select category">
                  <SelectValue placeholder={`Show`} />
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
                {allUserstable.getRowModel().rows.length.toLocaleString()} of{" "}
                {allUserstable?.getRowModel().rows?.length?.toLocaleString() *
                  allUserstable.getPageCount().toLocaleString()}{" "}
                Rows
              </div>
            </div>
          </CardFooter>
        </Card>
      </Container>
    </div>
  );
};

export default AdminAllUsers;
