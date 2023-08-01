import React from "react";

import styled from "styled-components";
import { useDispatch } from "react-redux";
import { productAction } from "../../server/slice";
import { useRouter } from "next/router";
import { mobile } from "../../server/responsive";

const Info = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;

  left: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  transition: all 0.5s ease;
  cursor: pointer;
  margin-top: 30px;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  margin-top: 20px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  border-radius: 15px;
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
  margin-top: -83px;
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
  text-align: center;
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
        <Name>
          <strong> {item.name}</strong>
        </Name>

        <button className="btn btn-primary">show more</button>
      </Info>
    </Container>
  );
};

export default Product;
