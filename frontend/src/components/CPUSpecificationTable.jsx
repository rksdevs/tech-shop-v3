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

const CPUSpecificationTable = ({ product }) => {
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
          <TableCell>{product?.sku || "NA"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">CHIPSET</TableCell>
          <TableCell>
            {product?.specificationDetails?.cpuChipset || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">CPU</TableCell>
          <TableCell>
            {product?.specificationDetails?.cpuModel || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">CORES</TableCell>
          <TableCell>
            {product?.specificationDetails?.cpuCores || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">THREADS</TableCell>
          <TableCell>
            {product?.specificationDetails?.cpuThreads || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">
            BASE FREQUENCY
          </TableCell>
          <TableCell>
            {product?.specificationDetails?.cpuBaseFrequency || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">
            MAX TURBO FREQUENCY
          </TableCell>
          <TableCell>
            {product?.specificationDetails?.cpuMaxTurboFrequency || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">CACHE</TableCell>
          <TableCell>
            {product?.specificationDetails?.cpuCache || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">BUS SPEED</TableCell>
          <TableCell>
            {product?.specificationDetails?.cpuBusSpeed || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">TDP</TableCell>
          <TableCell>{product?.specificationDetails?.cpuTDP || "NA"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">
            PROCESSOR GRAPHICS
          </TableCell>
          <TableCell>
            {product?.specificationDetails?.cpuProcessorGraphics || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">
            Supported Sockets
          </TableCell>
          <TableCell>
            {product?.specificationDetails?.cpuSupportSockets || "NA"}
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

export default CPUSpecificationTable;
