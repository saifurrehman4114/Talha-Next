import React from "react";
import styled from "styled-components";
import { mobile } from "../../server/responsive";
import FavouriteItem from "./FavouriteItem";
import CategoryItem from "./CategoryItem";
const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;
const Header = styled.h2`
  text-align: center;
  margin-top: 20px;
`;

const Categories = ({ list, title }) => {
  return (
    <>
      <Header>{title}</Header>
      {title == "OUR BRANDS" ? (
        <Container>
          {list.map((item, index) => (
            <CategoryItem item={item} key={item.id} title={title} />
          ))}
        </Container>
      ) : (
        <Container>
          {list.map((item) => (
            <FavouriteItem item={item} key={item.id} title={title} />
          ))}
        </Container>
      )}
    </>
  );
};

export default Categories;
