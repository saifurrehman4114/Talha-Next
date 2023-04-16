import axios from "axios";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { mobile } from "../responsive";
import { productAction } from "../slice";
import { useRouter } from "next/router";
import React from "react";
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
  color: ${(props) =>
    props.color == "OUR FAVOURITES" ? "lightblack" : "white"};
  margin-bottom: 0px;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: black;
  color: lightpink;
  cursor: pointer;
  font-weight: 600;
`;

const FavouriteItem = ({ item, title }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const setProduct = productAction.setProduct;
  const fetchProduct = async (name) => {
    await axios
      .post("https://cosmato-organic-pakistan.fly.dev/api/getSomeProduct", {
        productName: name,
      })
      .then((res) => {
        console.log(res.data[0]);
        const item = res.data[0];
        dispatch(setProduct({ item }));
        router.push("/product");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Button
          onClick={() => {
            console.log(item.title);
            fetchProduct(item.title);
          }}
        >
          SHOP NOW
        </Button>
        <Title color={title}>{item.title}</Title>
      </Info>
    </Container>
  );
};

export default FavouriteItem;
