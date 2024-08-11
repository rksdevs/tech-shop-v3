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

const GPUSpecificationTable = ({ product }) => {
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
            {product?.specificationDetails?.modelNumber || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">CHIPSET</TableCell>
          <TableCell>
            {product?.specificationDetails?.gpuChipset || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">GPU</TableCell>
          <TableCell>
            {product?.specificationDetails?.gpuModel || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">PCI EXPRESS</TableCell>
          <TableCell>
            {product?.specificationDetails?.pciExpress || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">
            GPU BASE CLOCK
          </TableCell>
          <TableCell>
            {product?.specificationDetails?.gpuBaseClock || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">
            GPU BOOST CLOCK
          </TableCell>
          <TableCell>
            <ul>
              {product?.specificationDetails?.gpuBoostClock?.length
                ? product?.specificationDetails?.gpuBoostClock?.map(
                    (item, index) => <li key={index}>{item}</li>
                  )
                : "NA"}
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">MEMORY CLOCK</TableCell>
          <TableCell>
            {product?.specificationDetails?.gpuMemoryClock || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">MEMORY SIZE</TableCell>
          <TableCell>
            {product?.specificationDetails?.gpuMemorySize || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">
            MEMORY INTERFACE
          </TableCell>
          <TableCell>
            {product?.specificationDetails?.gpuMemoryInterface || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">MEMORY TYPE</TableCell>
          <TableCell>
            {product?.specificationDetails?.gpuMemoryType || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">
            DIRECT X SUPPORT
          </TableCell>
          <TableCell>
            {product?.specificationDetails?.gpuDirectX || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">OPEN GL</TableCell>
          <TableCell>
            {product?.specificationDetails?.gpuOpenGl || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">PORTS</TableCell>
          <TableCell>
            <ul>
              {product?.specificationDetails?.gpuPorts?.length
                ? product?.specificationDetails?.gpuPorts?.map(
                    (item, index) => <li key={index}>{item}</li>
                  )
                : "NA"}
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">RESOLUTION</TableCell>
          <TableCell>
            {product?.specificationDetails?.gpuResolution || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">
            GPU CORE (CUDA CORE)
          </TableCell>
          <TableCell>
            {product?.specificationDetails?.gpuCudaCores || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">
            POWER CONNECTORS
          </TableCell>
          <TableCell>
            {product?.specificationDetails?.gpuPowerConnectors || "NA"}
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

export default GPUSpecificationTable;
