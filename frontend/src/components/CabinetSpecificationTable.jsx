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

const CabinetSpecificationTable = ({ product }) => {
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
            {product?.specificationDetails?.cabinetModelNumber || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">FORM FACTOR</TableCell>
          <TableCell>
            {product?.specificationDetails?.cabinetFormFactor || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">DIMENSIONS</TableCell>
          <TableCell>
            {product?.specificationDetails?.cabinetChassis || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">
            PREINSTALLED FANS
          </TableCell>
          <TableCell>
            {product?.specificationDetails?.cabinetPreinstalledFans || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">IO PANEL</TableCell>
          <TableCell>
            {product?.specificationDetails?.cabinetIOPanel || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">
            LIQUID COOLING
          </TableCell>
          <TableCell>
            <ul>
              {product?.specificationDetails?.cabinetLiquidCooling?.length
                ? product?.specificationDetails?.cabinetLiquidCooling?.map(
                    (item, index) => <li key={index}>{item}</li>
                  )
                : "NA"}
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">FAN SUPPORT</TableCell>
          <TableCell>
            <ul>
              {product?.specificationDetails?.cabinetFanSupport?.length
                ? product?.specificationDetails?.cabinetFanSupport?.map(
                    (item, index) => <li key={index}>{item}</li>
                  )
                : "NA"}
            </ul>
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

export default CabinetSpecificationTable;
