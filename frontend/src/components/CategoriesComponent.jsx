import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";
import {
  removeCategoryFilter,
  setCategoryFilter,
  setIncludeOutOfStock,
} from "../Features/filterSlice";

const { useState } = require("react");

export const CategoriesComponent = ({ allCategories }) => {
  const { categoryFilter, includeOutOfStock } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();
  // const [includeOutOfStockFilter, setIncludeOutOfStockFilter] = useState(true);

  const handleCheckbox = (e) => {
    if (categoryFilter.includes(e)) {
      let newPayload = categoryFilter.filter((item) => item !== e);
      dispatch(removeCategoryFilter(newPayload));
    } else {
      dispatch(setCategoryFilter(e));
    }
  };

  return (
    <ScrollArea className="h-72">
      <div className="flex justify-start items-center gap-3 mb-1">
        <Checkbox
          id="outOfStock"
          onCheckedChange={() =>
            dispatch(setIncludeOutOfStock(!includeOutOfStock))
          }
          checked={includeOutOfStock}
        />
        <label
          htmlFor="outOfStock"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pt-1"
        >
          Out Of Stock
        </label>
      </div>
      {allCategories?.map((category, index) => (
        <div key={index} className="flex justify-start items-center gap-3 mb-1">
          <Checkbox
            id={category}
            onCheckedChange={() => handleCheckbox(category)}
            checked={JSON.parse(
              localStorage.getItem("filter")
            )?.categoryFilter?.includes(category)}
          />
          <label
            htmlFor={category}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pt-1"
          >
            {category === "Streaming Accessories"
              ? "Streaming"
              : category === "CPU"
              ? "Processor"
              : category === "GPU"
              ? "Graphics Card"
              : category === "PSU"
              ? "Power Supply"
              : category === "SSD"
              ? "Memory SSD"
              : category === "HDD"
              ? "Memory HDD"
              : category}
            {/* {category} */}
          </label>
        </div>
      ))}
    </ScrollArea>
  );
};
