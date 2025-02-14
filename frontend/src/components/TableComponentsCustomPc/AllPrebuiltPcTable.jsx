import { useMemo, useState } from "react";
import sampleImg from "../../components/assets/images/psu-1.png";
import TableFooter from "../TableFooter";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  createColumnHelper,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Button } from "../ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../Container";
import { Input } from "../ui/input";
import { Card, CardContent, CardFooter } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Pagination } from "../ui/pagination";
import { Skeleton } from "../ui/skeleton";
import {
  useDeletePrebuiltPcMutation,
  useGetAllPrebuiltPcsQuery,
} from "../../Features/pcConfigureApiSlice";
import { useToast } from "../ui/use-toast";

const AllPrebuiltPcTable = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    data: allPrebuiltPcs,
    isLoading: allPrebuiltPcsLoading,
    error: allPrebuiltPcsError,
    refetch,
  } = useGetAllPrebuiltPcsQuery();

  const [
    deletePrebuiltPc,
    { isLoading: deletePrebuiltPcLoading, error: deletePrebuiltPcError },
  ] = useDeletePrebuiltPcMutation();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const allProductsData = useMemo(() => {
    return allPrebuiltPcs || [];
  }, [allPrebuiltPcs]);

  const handleDeleteItem = async (e) => {
    // e.preventDefault();
    try {
      await deletePrebuiltPc(e).unwrap();
      refetch();
      toast({
        title: "Deleted Prebuilt PC!",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Can not delete Prebuilt PC!",
        description: error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  const columnHelper = createColumnHelper();
  /** @type import('@tanstack/react-table').columnDef<any>*/
  const columns = [
    columnHelper.accessor((row) => row, {
      id: "Product",
      cell: (info) => (
        <Link to={`/product/${info.getValue()?.slug}`}>
          <img
            src={
              info.getValue()?.pcImage === "/images/sample.jpg"
                ? sampleImg
                : info.getValue()?.pcImage
            }
            alt="product-img"
            height="40"
            width="40"
            className="w-[40px] h-[40px]"
          />
        </Link>
      ),
      header: "Product",
      className: "hidden sm:table-cell",
    }),
    columnHelper.accessor((row) => row.pcName, {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <p className="pl-4">
          {row.getValue("name").length > 40
            ? `${row.getValue("name").split(" ").slice(0, 4).join(" ")}...`
            : row.getValue("name")}{" "}
        </p>
      ),
    }),
    columnHelper.accessor((row) => Object.values(row.pcComponents), {
      id: "Components",
      cell: (info) => (
        <ul key={info.getValue()._id}>
          {info
            .getValue()
            .filter((item) => item.hasOwnProperty("name"))
            .map((item, index) => (
              <li key={index} className="mb-2">
                <span className="text-muted-foreground font-semibold">1 x</span>{" "}
                <span className="text-sm">
                  {" "}
                  {item?.name?.split(" ").slice(0, 7).join(" ") || "NA"}
                </span>
              </li>
            ))}
        </ul>
      ),
      className: "hidden sm:table-cell",
    }),
    columnHelper.accessor((row) => row.pcTotalPrice, {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className=""
          >
            Price
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: (info) => (
        <p className="flex items-center justify-center pr-6">
          ₹ {info.getValue()}
        </p>
      ),
    }),
    {
      accessorKey: "countInStock",
      header: "Stock",
      className: "hidden sm:table-cell",
    },
    columnHelper.accessor((row) => row, {
      id: "Update",
      cell: (info) => (
        <Button
          className="pt-1"
          variant="outline"
          size="sm"
          onClick={() =>
            navigate(`/admin/editPrebuiltPc/${info.getValue()._id}`)
          }
        >
          Edit
        </Button>
      ),
    }),
    columnHelper.accessor((row) => row, {
      id: "Delete",
      cell: (info) => (
        <Trash2
          className="w-4 h-4 hover:text-primary hover:cursor-pointer"
          onClick={() => handleDeleteItem(info.getValue()._id)}
        />
      ),
      className: "hidden sm:table-cell",
    }),
  ];

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  const allProductstable = useReactTable({
    data: allProductsData,
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
    <Container className="flex flex-col gap-4">
      <div className="section-heading flex justify-between items-center">
        <h1 className="font-extrabold flex">Prebuilt PCs</h1>
        <div className="flex md:items-end gap-4">
          <Input
            placeholder="Search by name..."
            value={allProductstable.getColumn("name")?.getFilterValue() ?? ""}
            onChange={(event) =>
              allProductstable
                .getColumn("name")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-full md:max-w-sm"
          />
        </div>
      </div>
      <Card className="rounded-none md:rounded-lg">
        {allPrebuiltPcsLoading ? (
          <div className="flex items-center space-x-4 flex-col">
            <div className="space-y-2 flex gap-2 items-center p-4">
              <Skeleton className="h-10 w-10 rounded-[20px] " />
              <Skeleton className="h-4 w-[200px] md:w-[400px]" />
            </div>
            <div className="space-y-2 flex gap-2 items-center p-4">
              <Skeleton className="h-10 w-10 rounded-[20px] " />
              <Skeleton className="h-4 w-[200px] md:w-[400px]" />
            </div>
            <div className="space-y-2 flex gap-2 items-center p-4">
              <Skeleton className="h-10 w-10 rounded-[20px] " />
              <Skeleton className="h-4 w-[200px] md:w-[400px]" />
            </div>
            <div className="space-y-2 flex gap-2 items-center p-4">
              <Skeleton className="h-10 w-10 rounded-[20px] " />
              <Skeleton className="h-4 w-[200px] md:w-[400px]" />
            </div>
            <div className="space-y-2 flex gap-2 items-center p-4">
              <Skeleton className="h-10 w-10 rounded-[20px] " />
              <Skeleton className="h-4 w-[200px] md:w-[400px]" />
            </div>
            <div className="space-y-2 flex gap-2 items-center p-4">
              <Skeleton className="h-10 w-10 rounded-[20px] " />
              <Skeleton className="h-4 w-[200px] md:w-[400px]" />
            </div>
          </div>
        ) : allPrebuiltPcsError ? (
          <Card className="min-h-[30vh] flex justify-center items-center">
            <CardContent className="font-bold flex justify-center items-center">
              Oops No Data to display!
            </CardContent>
          </Card>
        ) : (
          <Table>
            <TableHeader>
              {allProductstable?.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-muted">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={`py-1 first:rounded-none md:first:rounded-tl-lg last:rounded-none md:last:rounded-tr-lg first:pl-5 last:pr-5 ${
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
              {allProductstable?.getRowModel().rows.map((row) => (
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
        )}

        <TableFooter allProductstable={allProductstable} />
      </Card>
    </Container>
  );
};

export default AllPrebuiltPcTable;
