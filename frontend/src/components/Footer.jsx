import React from "react";
import { Facebook, Instagram, Youtube } from "lucide-react";
import Container from "./Container";
import upiLogo from "../components/assets/images/upi.png";
import gpayLogo from "../components/assets/images/gpay.png";
import masterCardLogo from "../components/assets/images/mastercard.png";
import visaLogo from "../components/assets/images/visa.png";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full flex-col mt-8">
      <Container className="flex w-full flex-col lg:flex-row gap-4 lg:gap-0 items-center justify-between my-0 lg:my-8">
        <div className="flex w-full items-center flex-col footer-left flex-grow-0 flex-shrink-0 basis-1/4">
          <h2 className="text-[24px] font-semibold flex flex-row items-center">
            TECH-SHOP
            <div className="text-primary text-[48px] flex h-[50px] mt-[5px] items-end">
              .
            </div>
          </h2>
          <div className="flex flex-rows items-center gap-[5px]">
            <Link
              to="https://www.instagram.com/bluemoon_rakesh/"
              target="_blank"
            >
              <Instagram className="h-[14px]" />
            </Link>
            <Link to="https://www.youtube.com/@rks_devs_24" target="_blank">
              <Youtube className="h-[14px]" />
            </Link>
          </div>
        </div>
        <div className="footer-middle flex gap-4 w-full flex-1 text-left flex-grow-0 flex-shrink-0 basis-1/2 justify-evenly">
          <div className="Product flex flex-col gap-2">
            <div className="footer-sub-heading">
              <h2 className="font-bold text-large">Products</h2>
            </div>
            <ul className="footer-list text-muted-foreground">
              <li
                className="footer-list-item font-semibold text-[12px] hover:underline hover:cursor-pointer"
                onClick={() => navigate("/allproducts")}
              >
                Computers
              </li>
              <li
                className="footer-list-item font-semibold text-[12px] hover:underline hover:cursor-pointer"
                onClick={() => navigate("/allproducts")}
              >
                Laptops
              </li>
              <li
                className="footer-list-item font-semibold text-[12px] hover:underline hover:cursor-pointer"
                onClick={() => navigate("/allproducts")}
              >
                Components
              </li>
              <li
                className="footer-list-item font-semibold text-[12px] hover:underline hover:cursor-pointer"
                onClick={() => navigate("/allproducts")}
              >
                Accessories
              </li>
            </ul>
          </div>
          <div className="custom-builds flex flex-col gap-2">
            <div className="footer-sub-heading">
              <h2 className="font-bold text-large">Custom Builds</h2>
            </div>
            <ul className="footer-list text-muted-foreground">
              <li
                className="footer-list-item font-semibold text-[12px] hover:underline hover:cursor-pointer"
                onClick={() => navigate("/prebuilt-pc")}
              >
                Gaming PCs
              </li>
              <li
                className="footer-list-item font-semibold text-[12px] hover:underline hover:cursor-pointer"
                onClick={() => navigate("/prebuilt-pc")}
              >
                Office PCs
              </li>
              <li
                className="footer-list-item font-semibold text-[12px] hover:underline hover:cursor-pointer"
                onClick={() => navigate("/prebuilt-pc")}
              >
                Servers
              </li>
              <li
                className="footer-list-item font-semibold text-[12px] hover:underline hover:cursor-pointer"
                onClick={() => navigate("/buildcustompc")}
              >
                Build your pc
              </li>
            </ul>
          </div>
          <div className="About us flex flex-col gap-2">
            <div className="footer-sub-heading">
              <h2 className="font-bold text-large">About Us</h2>
            </div>
            <ul className="footer-list text-muted-foreground">
              <li
                className="footer-list-item font-semibold text-[12px] hover:underline hover:cursor-pointer"
                onClick={() => navigate("/aboutus")}
              >
                About us
              </li>
              <li
                className="footer-list-item font-semibold text-[12px] hover:underline hover:cursor-pointer"
                onClick={() => navigate("/contactus")}
              >
                Contact us
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-right flex w-full gap-4 justify-center flex-grow-0 flex-shrink-0 basis-1/4 self-baseline">
          <div className="payments flex flex-col gap-4">
            <div className="footer-sub-heading">
              <h2 className="font-bold text-large">Accepted Payments</h2>
            </div>
            <div className="payment-btns flex gap-2">
              <img
                src={visaLogo}
                alt="visa"
                height="30"
                width="30"
                className="h-[30px] w-[30px]"
              />
              <img
                src={masterCardLogo}
                alt="mastercard"
                height="30"
                width="30"
                className="h-[30px] w-[30px]"
              />
              <img
                src={gpayLogo}
                alt="gpay"
                height="30"
                width="30"
                className="h-[30px] w-[30px]"
              />
              <img
                src={upiLogo}
                alt="upi"
                height="30"
                width="30"
                className="h-[30px] w-[30px]"
              />
            </div>
          </div>
        </div>
      </Container>
      <footer className="hidden sticky text-xs top-0 flex h-8 items-center gap-4 border-t bg-background px-4 md:px-6 mt-4 justify-center border-primary">
        Designed and Developed by{" "}
        <Link
          className="hover:text-primary hover:font-bold hover:underline"
          to="https://rks-devs.vercel.app/"
          target="_blank"
        >
          rksdevs
        </Link>
        <span>&copy; copyright {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
};

export default Footer;
