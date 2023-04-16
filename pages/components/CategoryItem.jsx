import React from "react";

import styled from "styled-components";
import { mobile } from "../responsive";
import Link from "next/link";

const Container = styled.div`
  flex: 1;

  margin: 3px;
  margin-top: 30px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
`;

const Title = styled.h4`
  color: "lightBlack";
  margin-bottom: 0px;
  background-color: white;
  width: 100%;
  text-align: center;
  margin-top: 10px;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: black;
  color: lightpink;
  cursor: pointer;
  font-weight: 600;
`;

const CategoryItem = ({ item, title }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Link href={`/ProductList/${item.title.toLowerCase()}`}>
          <Button>SHOP NOW</Button>
        </Link>
        <Title>{item.title}</Title>
      </Info>
    </Container>
  );
};

export default CategoryItem;