import React from "react";
import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { productAction } from "../slice";
import { useRouter } from "next/router";

const Info = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
const Name = styled.h4`
  color: black;
  opacity: 1;
  font-size: 18px;
  font-family: sans-serif;
`;

const Product = ({ item }) => {
  const dispatch = useDispatch();
  const setProduct = productAction.setProduct;
  const router = useRouter();
  console.log(item.img);
  return (
    <Container
      onClick={() => {
        dispatch(setProduct({ item }));
        router.push("/product");
      }}
    >
      <Circle />

      <Image src={item.img[0]} />

      <Info>
        <Name>{item.name}</Name>
        <Name>Quantity: {item.quantity} ml</Name>
      </Info>
    </Container>
  );
};

export default Product;
