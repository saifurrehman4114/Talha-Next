import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useInView } from "react-intersection-observer";
import Footer from "../components/Footer";
import Announcement from "../components/Announcement";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const TextBox = styled.div``;
const TextHead = styled.h1`
  color: green;
  text-align: center;
`;
const Text = styled.p`
  font-family: "Roboto", sans-serif;
  text-align: center;
  font-size: 19px;
  font-weight: 500;
`;

const About = () => {
  const { ref, inView } = useInView();
  // console.log(inView);
  // const variants = {
  //   hidden: { opacity: 0, x: -200 },
  //   visible: { opacity: 1, x: 0 },
  // };

  return (
    <div>
      <Announcement />
      <Navbar />
      <Container>
        <motion.div
          transition={{ ease: "easeOut", duration: 1.5 }}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          className="textContainer"
        >
          <motion.h1 className="textHead">COSMETO'S SLOGAN</motion.h1>
          <Text style={{ fontSize: "23px", fontWeight: 600 }}>
            Look pretty,feel pretty
          </Text>
        </motion.div>
        <motion.div
          transition={{ ease: "easeOut", duration: 1.5 }}
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          className="textContainer"
        >
          <motion.h1 className="textHead">OUR HISTORY</motion.h1>
          <Text>
            We are the official importers of Yougee and Samba in Pakistan. We
            have been delivering these products since 2010. We have our head
            office in Lahore and we are delivering these products all over
            Pakistan. We are the biggest importer of Yougee and Saba all accross
            Pakistan because of our reasonable pricing.
          </Text>
        </motion.div>
        <motion.div
          transition={{ ease: "easeOut", duration: 1.5 }}
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          className="textContainer"
        >
          <motion.h1 className="textHead">OUR VISION</motion.h1>
          <Text>
            Embellishing the lives, with the provision of top notch, health
            friendly cosmetics products and remarkable services around the
            country. We believe that by doing business the right way, we can
            make a positive impact on society and contribute to a better future
            for all.{" "}
          </Text>
        </motion.div>
      </Container>
      <Footer />
    </div>
  );
};

export default About;
