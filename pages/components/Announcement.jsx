import styled from "styled-components";
import React from "react";
import { mobile } from "../responsive";
const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  ${mobile({ fontSize: "10px" })}
`;

const Announcement = () => {
  return <Container>Zero Shipping charges for orders above Rs 6000</Container>;
};

export default Announcement;
