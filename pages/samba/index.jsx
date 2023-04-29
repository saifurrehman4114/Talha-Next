import Navbar from "../components/Navbar";
import styled from "styled-components";
import { mobile } from "../../server/responsive";
import axios from "axios";
import { useState } from "react";
import Product from "../components/Product";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import { definingSchema } from "@/schema";
import { dbConnect } from "@/util/connect";
import { BsSearch } from "react-icons/bs";
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
  ${mobile({
    width: "0px 20px",
    display: "flex",
    margin: "0px",
    marginLeft: "8px",
    marginTop: "25px",
  })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  margin-top: 40px;
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
  ${mobile({ width: "200px" })}
`;
const ContainerProducts = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Option = styled.option``;

function Samba({ product }) {
  const [products, setProducts] = useState(product);
  const [input, setInput] = useState("");
  // fetchProduct function

  const fetchProductsByName = async () => {
    console.log("inside");
    await axios
      .post("/api/products/getSome", {
        brand: "samba",
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
  //   const fetchProducts = async () => {
  //     await axios
  //       .post("/api/getAllProducts", {
  //         brand: brand,
  //       })
  //       .then((res) => {
  //         setProducts(res.data);
  //       })
  //       .catch((err) => {
  //         throw new Error(err);
  //       });
  //   };

  return (
    <Container>
      <Announcement></Announcement>
      <Navbar></Navbar>
      <Title>SAMBA PRODUCTS</Title>

      <FilterContainer>
        <Filter>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
          <BsSearch
            fontSize={30}
            style={{
              marginLeft: "15px",
              cursor: "pointer",
              border: "1px solid gray",

              padding: "5px",
              height: "100%",
              borderRadius: "10px",
            }}
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

export async function getStaticProps() {
  await dbConnect();
  let { productModal } = definingSchema();

  let allProducts = await productModal.find({ brand: "samba" });

  return {
    props: {
      product: JSON.parse(JSON.stringify(allProducts)),
    },
  };
}

export default Samba;
