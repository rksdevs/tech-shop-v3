import { SlashIcon } from "@radix-ui/react-icons";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function Breadcrumbs() {
  const location = useLocation();
  const { id: itemId } = useParams();
  const [currentPage, setCurrentPage] = useState("");
  const [previousPages, setPreviousPages] = useState([]);

  useEffect(() => {
    if (location.pathname === "/allproducts") {
      setCurrentPage("All Products");
    } else if (location.pathname === "/cart") {
      setCurrentPage("Cart");
    } else if (location.pathname === "/buildcustompc") {
      setCurrentPage("Custom Pc");
    } else if (location.pathname === "/prebuilt-pc") {
      setCurrentPage("Prebuilt PC");
    } else if (location.pathname === "/prebuilt-pc") {
      setCurrentPage("Prebuilt PC");
    } else if (location.pathname.includes("/product/") && itemId) {
      setCurrentPage("Product");
      setPreviousPages(["allproducts"]);
    } else if (location.pathname === "/checkout") {
      setCurrentPage("Checkout");
      setPreviousPages(["cart"]);
    } else if (location.pathname.includes("/order/") && itemId) {
      setCurrentPage("Order");
    }
  }, [location, itemId]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        {previousPages?.map((item, index) => (
          <div className="flex justify-center items-center gap-1.5" key={index}>
            <BreadcrumbItem>
              <Link to={`/${item.toLowerCase()}`}>
                {item === "allproducts"
                  ? "All Products"
                  : item === "cart"
                  ? "Cart"
                  : item}
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
          </div>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
