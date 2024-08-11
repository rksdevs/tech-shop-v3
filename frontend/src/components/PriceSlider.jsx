import { useState } from "react";
import { Slider } from "./ui/slider";
import { useDispatch, useSelector } from "react-redux";
import { setPriceFilter } from "../Features/filterSlice";

const PriceSlider = () => {
  const { priceFilter } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  // const [value, setValue] = useState(0);

  const handleChange = (newValue) => {
    dispatch(setPriceFilter(newValue));
    // console.log(newValue);
    // setValue(newValue);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-0">
      <h2 className="text-lg font-medium">Range</h2>
      <Slider
        value={[priceFilter]}
        max={300000}
        min={0}
        step={10000}
        onValueChange={handleChange}
      />
      <div className="text-sm font-medium ">upto ₹{priceFilter}</div>
    </div>
  );
};

export default PriceSlider;
