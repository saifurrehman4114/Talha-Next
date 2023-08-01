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
  width: 100%;
  overflow: hidden;
`;
const Parent = styled.div`
  background-image: url("https://images.unsplash.com/photo-1565356388813-5a047b9f5807?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80");
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
`;
const TextBox = styled.div``;
const TextHead = styled.h1`
  color: teal;
  text-align: center;
`;
const Text = styled.p`
  font-family: "Roboto", sans-serif;
  text-align: center;
  font-size: 19px;
  font-weight: 700;
  color: white;
`;

const About = () => {
  const { ref: ref1, inView: inView1 } = useInView({ threshold: 0.1 });
  const { ref: ref2, inView: inView2 } = useInView({ threshold: 0.1 });
  const { ref: ref3, inView: inView3 } = useInView({ threshold: 0.1 });
  const variants = {
    hidden: { opacity: 0, x: -200 },
    visible: { opacity: 1, x: 0 },
  };
  const variants1 = {
    hidden: { opacity: 0, x: 200 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <div>
      <Announcement />
      <Navbar />
      <Parent>
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
              have been delivering these products since 2010.We are the biggest
              importer of Yougee and Saba all accross Pakistan because of our
              reasonable pricing.
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
              make a positive impact on society and contribute to a better
              future for all.{" "}
            </Text>
          </motion.div>
          <motion.div
            transition={{ ease: "easeOut", duration: 1.5 }}
            ref={ref1}
            variants={variants1}
            animate={inView1 ? "visible" : "hidden"}
            className="textContainer"
          >
            <motion.h1 className="textHead">OUR MISSION</motion.h1>
            <Text>
              To provide geniune best quality products with affordable, market
              competitive rates in an efficient manner through remarkable supply
              chain process
            </Text>
          </motion.div>
        </Container>
        <motion.div
          transition={{ ease: "easeOut", duration: 1.5 }}
          ref={ref2}
          variants={variants}
          animate={inView2 ? "visible" : "hidden"}
          className="textContainer"
        >
          <motion.h1 className="textHead">YOUGEE</motion.h1>
          <Text>
            Yougee Cosmorganic provides 100% Natural and Organic Hair Car
            Products.
          </Text>
        </motion.div>
        <motion.div
          transition={{ ease: "easeOut", duration: 1.5 }}
          ref={ref3}
          variants={variants}
          animate={inView3 ? "visible" : "hidden"}
          className="textContainer"
        >
          <motion.h1 className="textHead">SAMBAA</motion.h1>
          <Text>
            Samba Cosmetics understands this desire for renewal and therefore
            delivers products that not only guarantee results but also give new
            life to the hair through the powerful action of our assets.
          </Text>
        </motion.div>
      </Parent>
      <Footer />
    </div>
  );
};

export default About;
