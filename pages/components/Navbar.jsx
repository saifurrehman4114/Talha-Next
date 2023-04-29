import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../../server/responsive";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { brandAction } from "../../server/slice";

import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Link from "next/link";

const CustomLink = styled.span`
  font-size: 24px;
  cursor: pointer;
  margin-left: 25px;
  font-weight: 600;
  color: black;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const MenuItem = styled.div`
  font-size: 18px;
  cursor: pointer;
  margin-left: 25px;
  font-weight: 500;
  color: white ${mobile({ fontSize: "12px", marginLeft: "10px" })};
`;
const Circle = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  color: white;
  font-size: 12px;
  background-color: black;
  border: 1px solid black;
  text-align: center;
  margin-bottom: 20px;
`;

const BootStrap = () => {
  const [brands, setBrands] = useState(["yougee", "samba"]);
  console.log(brands);
  const dispatch = useDispatch();
  const router = useRouter();
  const number = useSelector((state) => {
    return state.order.items.length;
  });
  function scrollToBottom() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }
  // const getBrands = async () => {
  //   await axios
  //     .get("/api/products/getBrand")
  //     .then((res) => {
  //       setBrands(res.data);
  //     })
  //     .catch((err) => {
  //       throw new Error(err);
  //     });
  // };
  // useEffect(() => {
  //   getBrands();
  // }, []);
  return (
    <nav
      class="navbar navbar-expand-lg navbar-light "
      style={{ backgroundColor: "#f8f8ff" }}
    >
      <motion.a
        initial={{ y: -150, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        class="navbar-brand "
        href="#"
      >
        <Link href="/">
          <CustomLink
            className="xs-20px"
            style={{ textDecoration: "none", color: "black" }}
          >
            COSMETO
          </CustomLink>
        </Link>
      </motion.a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{
                fontSize: "20px",
                margin: "0px 40px",
                marginTop: "-10px",
                fontWeight: "600",
                color: "black",
                cursor: "pointer",
              }}
            >
              Products
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              {brands.map((item) => {
                console.log(item);
                return (
                  <Link
                    href={`/${item.toLowerCase()}`}
                    class="dropdown-item"
                    onClick={() => {
                      dispatch(brandAction.changeBrand(item));
                    }}
                  >
                    {item}
                  </Link>
                );
              })}
            </div>
          </li>
          <li class="nav-item ">
            <Link href="/about">
              <CustomLink
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "20px",
                  margin: "0px 40px",
                  fontFamily: "revert",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                About Us
              </CustomLink>
            </Link>
          </li>
          <li class="nav-item ">
            <CustomLink
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "20px",
                margin: "0px 40px",
                fontFamily: "revert",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={scrollToBottom}
            >
              Contact Us
            </CustomLink>
          </li>

          <li class="nav-item ">
            <Link href="/cart">
              <CustomLink
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "20px",
                  margin: "0px 40px",
                  cursor: "pointer",
                }}
              >
                <AiOutlineShoppingCart
                  style={{ cursor: "pointer", fontSize: "25px" }}
                />
                <Circle>{number}</Circle>
              </CustomLink>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default BootStrap;
