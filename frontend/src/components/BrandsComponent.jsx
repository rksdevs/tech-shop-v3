import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";
import { removeBrandFilter, setBrandFilter } from "../Features/filterSlice";

export const BrandsComponent = ({ allBrands }) => {
  const { brandFilter } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleCheckbox = (e) => {
    if (brandFilter.includes(e)) {
      //if brandFilter already has the filter then remove it
      let newPayload = brandFilter.filter((item) => item !== e);
      dispatch(removeBrandFilter(newPayload));
    } else {
      dispatch(setBrandFilter(e));
    }
  };

  return (
    <ScrollArea className="h-72">
      {allBrands?.map((brand, index) => (
        <div key={index} className="flex justify-start items-center gap-3 mb-1">
          <Checkbox
            id={brand}
            onCheckedChange={() => handleCheckbox(brand)}
            checked={JSON.parse(
              localStorage.getItem("filter")
            )?.brandFilter?.includes(brand)}
          />
          <label
            htmlFor={brand}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pt-1"
          >
            {brand === "NEXT LEVEL RACING"
              ? "NL Racing"
              : brand === "TVS ELECTRONICS"
              ? "TVS"
              : brand === "WESTERN DIGITAL (WD)"
              ? "WD"
              : brand}
          </label>
        </div>
      ))}
    </ScrollArea>
  );
};
