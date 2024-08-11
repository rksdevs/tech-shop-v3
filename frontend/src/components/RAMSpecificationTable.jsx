import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const RAMSpecificationTable = ({ product }) => {
  const [specifications, setSpecifications] = useState([]);
  useEffect(() => {
    if (
      product?.otherSpecifications?.length ||
      product?.specificationDetails?.length
    ) {
      // console.log(product);
      // setSpecifications(product.otherSpecifications);

      const mergeSpecifications = (specDetails, otherSpecs) => {
        const result = [];

        // Process specificationDetails object
        for (const [key, value] of Object.entries(specDetails)) {
          if (Array.isArray(value) && value.length === 0) continue;
          if (typeof value === "string" && value.trim() === "") continue;
          if (!value) continue;
          result.push({ key, value });
        }

        // Process otherSpecifications array
        otherSpecs.forEach((spec) => {
          for (const [key, value] of Object.entries(spec)) {
            if (typeof value === "string" && value.trim() === "") continue;
            result.push({ key, value });
          }
        });

        return result;
      };

      const mergedSpecifications = mergeSpecifications(
        product?.specificationDetails,
        product?.otherSpecifications
      );

      setSpecifications(mergedSpecifications);
    }
  }, [product]);
  return (
    <Table className="rounded-md border">
      <TableCaption>Specifications</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px] text-left">Specification</TableHead>
          <TableHead className="text-center">Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {specifications?.map((spec, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium text-left">
              {spec.key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
              {/* {spec.key} */}
            </TableCell>
            <TableCell>{spec.value}</TableCell>
          </TableRow>
        ))}
        {/* <TableRow>
          <TableCell className="font-medium text-left">MODEL</TableCell>
          <TableCell>
            {product?.specificationDetails?.RAMModel || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">SERIES</TableCell>
          <TableCell>
            {product?.specificationDetails?.RAMMemorySeries || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">MEMORY TYPE</TableCell>
          <TableCell>
            {product?.specificationDetails?.RAMMemoryType || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">CAPACITY</TableCell>
          <TableCell>
            {product?.specificationDetails?.RAMCapacity || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">KIT TYPE</TableCell>
          <TableCell>
            {product?.specificationDetails?.RAMKitType || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">SPEED</TableCell>
          <TableCell>
            {product?.specificationDetails?.RAMSpeed || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">WARRANTY</TableCell>
          <TableCell>
            {product?.warrantyDetails?.warrantyPeriod || "NA"}
          </TableCell>
        </TableRow> */}
      </TableBody>
    </Table>
  );
};

export default RAMSpecificationTable;
