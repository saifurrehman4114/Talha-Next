import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import Navbar from "../components/Navbar";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { orderAction, registerAction } from "../slice";
import { useRouter } from "next/router";

import Announcement from "../components/Announcement";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [registered, setRegistered] = useState(
    useSelector((state) => {
      return state.registered;
    })
  );
  const orderDetails = useSelector((state) => {
    return state.order;
  });
  const router = useRouter();
  const email = useRef();
  const name = useRef();
  const phone1 = useRef();
  const phone2 = useRef();
  const city = useRef();
  const postalCode = useRef();
  const address = useRef();
  const dispatch = useDispatch();
  const register = registerAction.register;
  const [warn, setWarn] = useState(false);
  const setInfo = orderAction.setInfo;
  const registerUser = () => {
    // console.log(      name.current.value,phone1.current.value,city.current.value,postalCode.value )
    if (
      name.current.value &&
      phone1.current.value &&
      city.current.value &&
      postalCode.current.value &&
      address.current.value &&
      email.current.value
    ) {
      dispatch(
        setInfo({
          clientName: name.current.value,
          clientEmail: email.current.value,
          clientPhone1: phone1.current.value,
          clientPhone2: phone2.current.value,
          clientCity: city.current.value,
          clientPostal: postalCode.current.value,
          clientAddress: address.current.value,
        })
      );
      dispatch(register({ state: true }));
      router.push("/cart");
      setWarn(false);
    } else {
      setWarn(true);
    }
  };
  const setValues = () => {
    name.current.value = orderDetails.clientName;
    city.current.value = orderDetails.clientCity;
    phone1.current.value = orderDetails.clientPhone1;
    phone2.current.value = orderDetails.clientPhone2;
    postalCode.current.value = orderDetails.clientPostal;
    address.current.value = orderDetails.clientAddress;
    email.current.value = orderDetails.clientEmail;
  };
  useEffect(() => {
    if (registered) {
      setValues();
    }
  }, []);

  return (
    <>
      <Announcement />
      <Navbar />
      <Container>
        <Wrapper>
          <Title>Fill details</Title>
          {warn && (
            <Title style={{ fontSize: "17px", color: "red", fontWeight: 600 }}>
              FORM INCOMPLETE
            </Title>
          )}

          <Form>
            <Input placeholder="full name" ref={name} />
            <Input placeholder="email" ref={email} />
            <Input placeholder="phone number 1" ref={phone1} />
            <Input placeholder="phone number 2 (optional)" ref={phone2} />
            <Input placeholder="city" ref={city} />
            <Input placeholder="postal code" ref={postalCode} />
            <Input placeholder="Address" ref={address} />
            <Agreement>
              You have to complete this form so that your order will complete
            </Agreement>
            <Button
              onClick={(e) => {
                e.preventDefault();
                registerUser();
              }}
            >
              {registered ? "UPDATE AND CONTINUE" : "CONTINUE"}
            </Button>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Register;
