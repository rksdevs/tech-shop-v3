import { useEffect, useMemo, useState } from "react";
import {
  useGetProductsByCategoryQuery,
  useGetProductsByCategoryWithoutPageQuery,
} from "../../Features/productApiSlice";
import sampleImg from "../../components/assets/images/psu-1.png";
import TableFooter from "../TableFooter";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  createColumnHelper,
  getPaginationRowModel,
  SortingState,
  VisibilityState,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Button } from "../ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal, Plus } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Container from "../Container";
import { Input } from "../ui/input";
import { Card, CardFooter } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Pagination } from "../ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import {
  addCabinet,
  addCpu,
  addGpu,
  addCoolingSystem,
  addHdd,
  addHeadphone,
  addKeyboard,
  addMonitor,
  addMotherboard,
  addMouse,
  addMousepad,
  addPsu,
  addRam,
  addSsd,
} from "../../Features/pcBuilderSlice";
import { Skeleton } from "../ui/skeleton";
import {
  addConfigureCabinet,
  addConfigureCpu,
  addConfigureGpu,
  addConfigureCoolingSystem,
  addConfigureHdd,
  addConfigureHeadphone,
  addConfigureKeyboard,
  addConfigureMonitor,
  addConfigureMotherboard,
  addConfigureMouse,
  addConfigureMousepad,
  addConfigurePsu,
  addConfigureRam,
  addConfigureSsd,
} from "../../Features/pcConfigureSlice";

const MouseTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data: allMice,
    isLoading: allProcessorLoading,
    error: allProcessorError,
  } = useGetProductsByCategoryWithoutPageQuery("Mouse");

  const [actionDialogOpen, setActionDialogOpen] = useState(false);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 7,
  });

  const allProductsData = useMemo(() => {
    return allMice || [];
  }, [allMice]);

  const location = useLocation();
  const isPcConfigurePage = location.pathname.includes(
    "admin/configurePrebuiltPc"
  );
  const handleAddItem = (product, qty = 1) => {
    if (isPcConfigurePage) {
      switch (product.category) {
        case "CPU":
          dispatch(addConfigureCpu({ ...product, qty }));
          break;
        case "Motherboard":
          dispatch(addConfigureMotherboard({ ...product, qty }));
          break;
        case "CPU COOLER":
          dispatch(addConfigureCoolingSystem({ ...product, qty }));
          break;
        case "RAM":
          dispatch(addConfigureRam({ ...product, qty }));
          break;
        case "SSD":
          dispatch(addConfigureSsd({ ...product, qty }));
          break;
        case "HDD":
          dispatch(addConfigureHdd({ ...product, qty }));
          break;
        case "GPU":
          dispatch(addConfigureGpu({ ...product, qty }));
          break;
        case "PSU":
          dispatch(addConfigurePsu({ ...product, qty }));
          break;
        case "Cabinet":
          dispatch(addConfigureCabinet({ ...product, qty }));
          break;
        case "Monitor":
          dispatch(addConfigureMonitor({ ...product, qty }));
          break;
        case "Keyboard":
          dispatch(addConfigureKeyboard({ ...product, qty }));
          break;
        case "Mouse":
          dispatch(addConfigureMouse({ ...product, qty }));
          break;
        case "Mousepad":
          dispatch(addConfigureMousepad({ ...product, qty }));
          break;
        case "Headphone":
          dispatch(addConfigureHeadphone({ ...product, qty }));
          break;
        default:
          break;
      }
    } else {
      switch (product.category) {
        case "CPU":
          dispatch(addCpu({ ...product, qty }));
          break;
        case "Motherboard":
          dispatch(addMotherboard({ ...product, qty }));
          break;
        case "CPU COOLER":
          dispatch(addCoolingSystem({ ...product, qty }));
          break;
        case "RAM":
          dispatch(addRam({ ...product, qty }));
          break;
        case "SSD":
          dispatch(addSsd({ ...product, qty }));
          break;
        case "HDD":
          dispatch(addHdd({ ...product, qty }));
          break;
        case "GPU":
          dispatch(addGpu({ ...product, qty }));
          break;
        case "PSU":
          dispatch(addPsu({ ...product, qty }));
          break;
        case "Cabinet":
          dispatch(addCabinet({ ...product, qty }));
          break;
        case "Monitor":
          dispatch(addMonitor({ ...product, qty }));
          break;
        case "Keyboard":
          dispatch(addKeyboard({ ...product, qty }));
          break;
        case "Mouse":
          dispatch(addMouse({ ...product, qty }));
          break;
        case "Mousepad":
          dispatch(addMousepad({ ...product, qty }));
          break;
        case "Headphone":
          dispatch(addHeadphone({ ...product, qty }));
          break;
        default:
          break;
      }
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
              info.getValue()?.image === "/images/sample.jpg"
                ? sampleImg
                : info.getValue()?.image
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
    columnHelper.accessor((row) => row.name, {
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
    {
      accessorKey: "countInStock",
      header: "Stock",
      className: "hidden sm:table-cell",
    },
    columnHelper.accessor((row) => row.currentPrice, {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className=""
          >
            Current Price
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: (info) => (
        <p className="flex items-center justify-center pr-4">
          ₹ {info.getValue().toFixed(0)}
        </p>
      ),
    }),
    columnHelper.accessor((row) => row, {
      id: "Actions",
      cell: (info) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleAddItem(info.getValue())}
        >
          Add
        </Button>
      ),
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
      <div className="section-heading flex justify-end md:justify-between items-center">
        <h1 className="font-extrabold hidden md:flex">Mice</h1>
        <div className="flex md:items-end gap-4">
          <Input
            placeholder="Search products by name"
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
        {allProcessorLoading ? (
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
        ) : allProcessorError ? (
          <>Oops Something went wrong!</>
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

export default MouseTable;
