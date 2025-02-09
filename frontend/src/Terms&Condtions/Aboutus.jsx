import React from "react";
import { Typography, Container, Grid, Button } from "@mui/material";
import MetaData from "../component/layouts/MataData/MataData";
import TermsImage from "../Image/about/tc.jpg";
import { Link } from "react-router-dom";
import "./Aboutus.css";

const About_UsPage = () => {

  return (
    <>
      <div className="about_us">
        <MetaData title={"About Us"} />
        <Container className="container_12">
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} style={{ display: "flex", flexDirection: "column", justifyContent: "end" }}>
              <img
                src={TermsImage}
                alt="Irmitek"
                className="image_about"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h2"
                component="h1"
                className="title_about"
              >
                About Us
              </Typography>
              <Typography variant="body1" className="introText_about">
                Irmitek is an online digital marketplace that specializes in providing genuine software licenses, game keys, and digital products. Founded in 2019, we have already served over 20,000 customers worldwide, offering the best deals on a wide range of products. Our mission is to provide customers with access to high-quality software and digital content at competitive prices, ensuring an exceptional and secure shopping experience.
              </Typography>
              <Typography variant="body1" className="introText_about">
                Irmitek was founded by John Doe, an entrepreneur with a deep passion for technology and software. With years of experience in the tech industry, John sought to create a platform that not only offers a vast selection of digital products but also guarantees authenticity and customer satisfaction. Since its inception, Irmitek has expanded rapidly and continues to grow, offering thousands of game keys, software licenses, and digital products from reputable publishers and developers.
              </Typography>
            </Grid>
          </Grid>
        </Container>
        <Container className="container_12">
          <Typography
            variant="h3"
            component="h1"
            className="heading12_about"
          >
            Who We Are
          </Typography>
          <Typography variant="body1" className="infoText_about">
            Irmitek is a trusted online marketplace dedicated to offering customers a wide range of digital products including game keys, software licenses, subscriptions, and more. Our platform allows gamers, developers, and digital enthusiasts to access high-quality software and gaming products at the most competitive prices.
          </Typography>
          <Typography variant="body1" className="infoText_about">
            Since launching in 2019, we have built a strong and loyal customer base by providing a reliable platform where customers can find trusted, genuine digital products. Whether you're looking for the latest game keys, professional software for your business, or gaming accessories, Irmitek has something for everyone.
          </Typography>
          <Typography variant="body1" className="infoText_about">
            Our team works directly with game publishers and software developers to ensure that every product on our platform is genuine and of the highest quality. We believe in providing our customers with the best tools for their personal and professional needs while maintaining an exceptional level of customer service and support.
          </Typography>
        </Container>
        <Container className="container_12">
          <Typography
            variant="h3"
            component="h1"
            className="heading12_about"
          >
            Our Mission
          </Typography>
          <Typography variant="body1" className="infoText_about">
            At Irmitek, our mission is to make digital software and gaming content accessible to everyone, at the best prices. We aim to provide a seamless online shopping experience, offering digital keys and software licenses that cater to gamers, developers, professionals, and businesses. Our platform strives to meet the needs of our customers by continuously updating our product offerings and providing top-notch customer support.
          </Typography>
          <Typography variant="body1" className="infoText_about">
            We are committed to ensuring that every customer has a hassle-free shopping experience with secure payment methods, instant delivery, and ongoing support. Whether you're a gamer looking for the latest titles or a professional searching for software tools to optimize your business, Irmitek is here to provide you with everything you need.
          </Typography>
        </Container>
        <Container className="container_12">
          <Typography variant="h3" component="h1" className="heading12_about">
            Why Choose Us
          </Typography>
          <Typography variant="body1" className="infoText_about">
            Irmitek is not just another digital marketplace; we are your trusted partner in discovering and purchasing genuine software and game keys. Our platform is built on the foundation of **authenticity**, **customer satisfaction**, and **security**.
          </Typography>
          <Typography variant="body1" className="infoText_about">
            We provide a **wide selection** of digital products, including **game keys**, **software licenses**, and **subscriptions**, all backed by excellent customer support. We believe in building long-term relationships with our customers by offering competitive prices, fast delivery, and a commitment to providing high-quality products.
          </Typography>
          <div className="buttonContainer_about">
            <Link
              to="/products"
              style={{ textDecoration: "none", color: "none" }}
            >
              <Button variant="contained" className="button1_about">
                Our Products
              </Button>
            </Link>
            <Link
              to="/contact"
              style={{ textDecoration: "none", color: "none" }}
            >
              <Button variant="contained" className="button2_about">
                Contact Us
              </Button>
            </Link>
          </div>
        </Container>
      </div >
    </>
  );
};

export default About_UsPage;
