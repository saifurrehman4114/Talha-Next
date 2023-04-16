import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Room,
} from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import Link from "next/link";
const CustomLink = styled.span`
  font-size: 24px;
  cursor: pointer;
  margin-left: 25px;
  font-weight: 600;
  color: black;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const Container = styled.div`
  display: flex;
  margin-top: 100px;
  ${mobile({ flexDirection: "column" })};
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

const Footer = () => {
  return (
    <Container id="footer">
      <Left>
        <Logo>COSMETO PAKISTAN.</Logo>
        <Desc>
          Embellishing the lives, with the provision of top notch, health
          friendly cosmetics products and remarkable services around the country
        </Desc>
        <SocialContainer>
          <SocialIcon
            href="https://www.facebook.com/YougeePakistan?mibextid=ZbWKwL"
            target="_blank"
            color="3B5999"
          >
            <Facebook />
          </SocialIcon>
          <SocialIcon
            href="https://www.instagram.com/yougeepakistan/?igshid=YmMyMTA2M2Y="
            target="_blank"
            color="E4405F"
          >
            <Instagram />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>
            <Link href="/">Home</Link>
          </ListItem>

          <ListItem>
            <Link href="/cart">Cart</Link>
          </ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> 137 H Model Town, Lahore
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> 03334283529 Talha Tahir
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> 03334283529 Zahid Atta
        </ContactItem>

        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} />
          zaent99@gmail.com
        </ContactItem>
      </Right>
    </Container>
  );
};

export default Footer;
