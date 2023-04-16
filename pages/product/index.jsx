import React from "react";
import { Close } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { orderAction } from "../slice";
import { useRouter } from "next/router";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Color = styled.button`
  margin: 5px;
  background-color: lightBlue;
  border: 1px solid blue;
  padding: 4px;
`;

const Product = () => {
  const item = useSelector((state) => {
    return state.product;
  });
  const [selectedValue, setSelectedValue] = useState(null);
  const options = [10, 20, 30];

  const handleOptionClick = (option) => {
    setSelectedValue(option);
  };
  const [reg, setReg] = useState(
    useSelector((state) => {
      return state.registered;
    })
  );
  const [selectedVolume, setSelectedVolume] = useState(10);

  const [quantity, setQuantity] = useState(1);
  const [colorArray, setColorArray] = useState([]);
  const [volume, setVolume] = useState();
  const addItem = orderAction.addItem;
  const dispatch = useDispatch();
  const [finalPriceCream, setFinalPriceCream] = useState(0);
  const [finalPrice, setFinalPrice] = useState(item.price);
  const router = useRouter();
  const handleSubmit = () => {
    if (item.category === "Hair Color Cream" && colorArray.length > 0) {
      let finalItem = {
        name: item.name,
        price: finalPriceCream,
        color: colorArray,
        category: "Hair Color Cream",
        quantity: quantity,
        measure: item.quantity,
        img: item.img[0],
        id: item._id,
      };
      console.log(finalItem);
      dispatch(addItem({ item: finalItem }));

      router.push("/cart");
    } else if (item.category == "Hair Color Cream" && colorArray.length == 0) {
      alert("You have to add details about order!");
    } else if (item.category === "Mask") {
      let finalItem = {
        name: item.name,
        price: finalPrice,
        itemPrice: item.price,
        category: "Mask",
        volume: selectedVolume,
        quantity: quantity,
        measure: item.quantity,
        img: item.img[0],
        id: item._id,
      };
      console.log(finalItem);
      dispatch(addItem({ item: finalItem }));
      router.push("/cart");
    } else {
      let finalItem = {
        name: item.name,
        price: finalPrice,
        quantity: quantity,
        itemPrice: item.price,
        measure: item.quantity,
        img: item.img[0],
        id: item._id,
      };
      console.log(finalItem);
      dispatch(addItem({ item: finalItem }));
      router.push("/cart");
    }
  };

  return (
    <Container>
      <Announcement />
      <Navbar />

      <Wrapper>
        <ImgContainer>
          <div id="carouselExampleIndicators" className="carousel slide">
            <ol className="carousel-indicators">
              {item.img.map((item, index) => {
                return (
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to={index}
                    className={index == 0 ? "active" : ""}
                  ></li>
                );
              })}
            </ol>
            <div className="carousel-inner">
              {item.img.map((image, index) => {
                return (
                  <div
                    className={`carousel-item ${index == 0 ? "active" : ""}`}
                  >
                    <img
                      className="d-block w-100"
                      src={image}
                      alt="First slide"
                    />
                  </div>
                );
              })}
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
            </a>
          </div>
        </ImgContainer>
        <InfoContainer>
          <Title>{item.name}</Title>
          <Desc>
            <strong>DESCRIPTION: </strong>
            <br />
            {item.description}
          </Desc>
          <Desc>
            <strong>QUANTITY: </strong>
            {item.quantity} ml
          </Desc>
          <Desc>
            <strong>Number of items: </strong>
            <button
              onClick={() => {
                setFinalPriceCream((state) => {
                  return item.price * colorArray.length * (quantity + 1);
                });
                setFinalPrice((state) => {
                  return state + item.price;
                });
                setQuantity((state) => {
                  return state + 1;
                });
              }}
              className="btn btn-danger"
            >
              +
            </button>
            <strong> {quantity} </strong>
            <button
              className="btn btn-danger"
              onClick={() => {
                if (quantity > 1) {
                  setFinalPrice((state) => {
                    return state - item.price;
                  });
                  setFinalPriceCream((state) => {
                    return item.price * colorArray.length * (quantity - 1);
                  });
                }
                setQuantity((state) => {
                  if (state > 1) {
                    return state - 1;
                  } else {
                    return state;
                  }
                });
              }}
            >
              -
            </button>
          </Desc>
          <Desc>
            <strong>USAGE:</strong>
            <br />
            {item.guide}
          </Desc>
          <Desc>
            <strong>FEATURES:</strong>

            {item.features.map((single, index) => {
              if (index > 0) {
                return (
                  <p>
                    {"->"}
                    {single}{" "}
                  </p>
                );
              }
            })}
          </Desc>
          {item.category == "Mask" && (
            <Desc>
              <strong>Volumes:</strong>
              <select
                value={selectedVolume}
                onChange={(e) => {
                  setSelectedVolume(e.target.value);
                }}
              >
                {item.volume.map((single) => {
                  return <option value={single}>{single}</option>;
                })}
              </select>
            </Desc>
          )}

          {item.color.length == 0 || (
            <Desc>
              <strong>COLORS SELECTED: </strong>
              <br />
              {colorArray.map((item) => {
                return (
                  <Color
                    onClick={() => {
                      setColorArray(() => {
                        let newArr = colorArray.filter((color) => {
                          return color != item;
                        });
                        setFinalPriceCream((state) => {
                          return item.price * newArr.length * quantity;
                        });
                        return newArr;
                      });
                    }}
                  >
                    {item} <Close />{" "}
                  </Color>
                );
              })}
            </Desc>
          )}
          {item.color == 0 || (
            <Desc>
              <strong>
                COLORS AVAILABLE: (Check the color from image slider and click
                to add the color){" "}
              </strong>
              <br />
              {item.color.map((iteminner) => {
                return (
                  <Color
                    onClick={() => {
                      setFinalPriceCream((state) => {
                        return item.price * (colorArray.length + 1) * quantity;
                      });
                      setColorArray([...colorArray, iteminner]);
                    }}
                  >
                    {iteminner}
                  </Color>
                );
              })}
            </Desc>
          )}
          <Desc>
            <strong> CATEGORY : </strong> {item.category}
          </Desc>
          <Desc>
            <strong> Status : </strong> {item.status}
          </Desc>

          <Desc>
            <strong> PRICE : </strong>Rs {item.price} (per item)
          </Desc>
          <Desc>
            <strong>TOTAL PRICE : </strong>Rs{" "}
            {item.category === "Hair Color Cream"
              ? finalPriceCream
              : finalPrice}
          </Desc>
          <AddContainer>
            <button
              type="button"
              className="btn btn-success"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              ADD TO CART
            </button>
            <a href={`${item.resource}`} target="_blank">
              <button className="btn btn-info">MORE INFO</button>
            </a>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};

export default Product;
