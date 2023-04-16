import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { orderAction } from "../slice";
import Link from "next/link";
import Announcement from "../components/Announcement";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })};
  margin-bottom: 50px;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 2;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 0px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "600"};
  font-size: ${(props) => props.type === "total" && "20px"};
`;

const SummaryItemText = styled.span`
  flex: 2;
`;

const SummaryItemPrice = styled.span`
  flex: 4;
`;

const Button = styled.button`
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  margin-right: 10px;
`;
const ColorSpan = styled.button`
  margin: 5px;
  background-color: lightBlue;
  border: 1px solid blue;
  padding: 4px;
`;
const Spacing = styled.div`
  background-color: black;
  height: 5px;
  margin: 0px 20px;
`;

const Cart = () => {
  const items = useSelector((state) => {
    return state.order.items;
  });
  const registered = useSelector((state) => {
    return state.registered;
  });
  const emptyItems = orderAction.emptyItems;
  const dispatch = useDispatch();
  const [prevOrders, setPrevOrders] = useState();
  const [userDetail, setUserDetail] = useState(
    useSelector((state) => {
      return state.order;
    })
  );

  const removeItem = orderAction.removeItem;

  var finalPrice = 0;

  // /fetching previous orders
  const fetchPrevOrders = async () => {
    await axios
      .post("https://cosmato-organic-pakistan.fly.dev/api/getUserOrders", {
        clientEmail: userDetail.clientEmail,
      })
      .then((res) => {
        console.log(res.data, " previous orders");
        setPrevOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //handling checkout
  const checkOut = async () => {
    await axios
      .post("https://cosmato-organic-pakistan.fly.dev/api/addOrder", {
        clientName: userDetail.clientName,
        clientEmail: userDetail.clientEmail,
        clientPhone1: userDetail.clientPhone1,
        clientPhone2: userDetail.clientPhone2,
        clientAddress: userDetail.clientAddress,
        clientPostal: userDetail.clientPostal,
        clientCity: userDetail.clientCity,
        total: finalPrice,
        items: items,
      })
      .then((res) => {
        console.log(res.data);
        dispatch(emptyItems());
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (registered) {
      fetchPrevOrders();
    }
  }, [registered]);

  console.log(items);
  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link href="/">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
        </Top>
        <Bottom>
          <Info>
            {items.map((single) => {
              finalPrice += single.price;

              return (
                <Product>
                  <ProductDetail>
                    <Image src={single.img} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {single.name}
                      </ProductName>
                      {single.category === "Mask" && (
                        <ProductName>
                          <b>Volume:</b> {single.volume}
                        </ProductName>
                      )}

                      <ProductName>
                        <b>Product quantity:</b> {single.measure} ml
                      </ProductName>
                      {single.category == "Hair Color Cream" && (
                        <ProductName>
                          <b>Colors:</b>{" "}
                          {single.color.map((singleColor) => {
                            return <ColorSpan>{singleColor}</ColorSpan>;
                          })}
                        </ProductName>
                      )}
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <ProductAmount>
                        <span>Order Quantity : </span> {single.quantity}
                      </ProductAmount>
                    </ProductAmountContainer>
                    <ProductPrice>Rs {single.price} </ProductPrice>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        console.log("removing");
                        dispatch(
                          removeItem({
                            name: single.name,
                            measure: single.measure,
                          })
                        );
                      }}
                    >
                      REMOVE
                    </button>
                  </PriceDetail>
                </Product>
              );
            })}

            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>

            <SummaryItem>
              <SummaryItemText>
                <strong> NAME : </strong>
              </SummaryItemText>
              <SummaryItemPrice>{userDetail.clientName}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>
                <strong> PHONE : </strong>
              </SummaryItemText>
              <SummaryItemPrice>
                {userDetail.clientPhone1} / {userDetail.clientPhone2}
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>
                <strong> ADDRESS : </strong>
              </SummaryItemText>
              <br />
              <SummaryItemPrice> {userDetail.clientAddress}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>
                <strong> City : </strong>
              </SummaryItemText>
              <SummaryItemPrice>{userDetail.clientCity}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>
                <strong> Postal Code : </strong>
              </SummaryItemText>
              <SummaryItemPrice>{userDetail.clientPostal}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>
                <strong> SHIPPING COST : </strong>
              </SummaryItemText>

              <SummaryItemPrice>
                Rs {finalPrice >= 6000 ? "0" : "350"}
              </SummaryItemPrice>
            </SummaryItem>

            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>

              <SummaryItemPrice>
                Rs {finalPrice < 6000 ? (finalPrice += 350) : (finalPrice += 0)}
              </SummaryItemPrice>
            </SummaryItem>
            {registered ? (
              <>
                <Link href="/register">
                  <Button
                    onClick={() => {}}
                    style={{ color: "black", backgroundColor: "white" }}
                  >
                    CHANGE ORDER DETAILS
                  </Button>
                </Link>
                <Button onClick={checkOut}>SUBMIT ORDER</Button>
              </>
            ) : (
              <Link href="/register">
                <Button>CHECKOUT NOW</Button>
              </Link>
            )}
          </Summary>
        </Bottom>
        <Spacing></Spacing>
        <Title>PREVIOUS ORDERS</Title>
        {prevOrders &&
          prevOrders.map((prev) => {
            return (
              <Bottom
                style={{
                  marginBottom: "150px",
                  borderBottom: "1px solid gray",
                  paddingBottom: "50px",
                }}
              >
                <Info>
                  {prev.items.map((single) => {
                    return (
                      <Product>
                        <ProductDetail>
                          <Image src={single.img} />
                          <Details>
                            <ProductName>
                              <b>Product:</b> {single.name}
                            </ProductName>

                            <ProductName>
                              <b>Product Quantity:</b> {single.measure} ml
                            </ProductName>
                            {single.category == "Hair Color Cream" && (
                              <ProductName>
                                <b>Colors:</b>{" "}
                                {single.color.map((singleColor) => {
                                  return <ColorSpan>{singleColor}</ColorSpan>;
                                })}
                              </ProductName>
                            )}
                          </Details>
                        </ProductDetail>
                        <PriceDetail>
                          <ProductAmountContainer>
                            <ProductAmount>
                              <span>Order Quantity : </span> {single.quantity}
                            </ProductAmount>
                          </ProductAmountContainer>
                          <ProductPrice>Rs {single.price} </ProductPrice>
                        </PriceDetail>
                      </Product>
                    );
                  })}

                  <Hr />
                </Info>
                <Summary>
                  <SummaryTitle>ORDER SUMMARY</SummaryTitle>

                  <SummaryItem>
                    <SummaryItemText>
                      <strong> NAME : </strong>
                    </SummaryItemText>
                    <SummaryItemPrice>{prev.clientName}</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemText>
                      <strong> PHONE : </strong>
                    </SummaryItemText>
                    <SummaryItemPrice>
                      {prev.clientPhone1} / {prev.clientPhone2}
                    </SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemText>
                      <strong> ADDRESS : </strong>
                    </SummaryItemText>
                    <br />
                    <SummaryItemPrice> {prev.clientAddress}</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemText>
                      <strong> City : </strong>
                    </SummaryItemText>
                    <SummaryItemPrice>{prev.clientCity}</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemText>
                      <strong> SHIPPING COST : </strong>
                    </SummaryItemText>

                    <SummaryItemPrice>
                      Rs {prev.clientCity == "lahore" ? `250` : `400`}
                    </SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemText>
                      <strong>Status : </strong>
                    </SummaryItemText>

                    <SummaryItemPrice>{prev.status}</SummaryItemPrice>
                  </SummaryItem>

                  <SummaryItem type="total">
                    <SummaryItemText>Total</SummaryItemText>
                    <SummaryItemPrice>Rs {prev.total}</SummaryItemPrice>
                  </SummaryItem>
                </Summary>
              </Bottom>
            );
          })}
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
