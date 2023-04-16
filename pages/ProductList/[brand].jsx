import { Search } from "@material-ui/icons";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import styled from "styled-components";
import { mobile } from "../responsive";
import axios from "axios";
import { useState } from "react";
import Product from "../components/Product";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
const Container = styled.div``;

const Title = styled.h2`
  text-align: center;
  margin-top: 30px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Input = styled.input`
  width: 300px;
  border: 1px solid gray;
  outline: none;
  font-size: 18px;
  padding: 5px;
  border-radius: 5px;
`;
const ContainerProducts = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Option = styled.option``;

function ProductList({ product }) {
  const router = useRouter();

  const { brand } = router.query;

  const [products, setProducts] = useState(product);
  const [input, setInput] = useState("");
  // fetchProduct function

  const fetchProductsByName = async () => {
    await axios
      .post("https://cosmato-organic-pakistan.fly.dev/api/getSomeProducts", {
        brand: brand,
        productName: input,
      })
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Announcement></Announcement>
      <Navbar></Navbar>
      <Title>{brand.toUpperCase()} PRODUCTS</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Search Products:</FilterText>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
          <Search
            style={{ marginLeft: "5px", cursor: "pointer" }}
            onClick={() => {
              fetchProductsByName();
            }}
          />
        </Filter>
      </FilterContainer>
      <ContainerProducts>
        {products.map((item) => (
          <Product item={item} key={item._id} />
        ))}
      </ContainerProducts>
      <Footer></Footer>
    </Container>
  );
}
//   server side function
export async function getServerSideProps({ query }) {
  const brand = query.brand;
  var product = await axios
    .post("https://cosmato-organic-pakistan.fly.dev/api/getAllProducts", {
      brand: brand,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return {
    props: {
      product,
    },
  };
}

export default ProductList;
