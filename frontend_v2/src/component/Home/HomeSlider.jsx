import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { Link } from 'react-router-dom';
import './HomeSlider.css';

const slides = [
  {
    image:
      'https://res.cloudinary.com/drosmiklv/image/upload/t_main_game1/v1739134575/game3_zhjkqa.webp',
    quote: 'Unlock Epic Gaming Experiences with the Best Deals',
    saleText: 'Up to 70% off on popular PC and console game keys',
    productText: 'Shop Games Now'
  },
  {
    image:
      'https://res.cloudinary.com/drosmiklv/image/upload/t_main_game1/v1739134576/game5_pilwne.webp',
    quote: 'Get the Latest Game Keys at Unbeatable Prices',
    saleText: 'Limited Time Offer: Save on Top-Selling Game Keys',
    productText: 'Buy Now'
  },
  {
    image:
      'https://res.cloudinary.com/drosmiklv/image/upload/t_main_game1/v1739134576/game6_aup1de.webp',
    quote: 'Enhance Your Gaming Setup with Accessories & DLCs',
    saleText: 'Special Discounts on Game Add-ons, DLCs & In-Game Currency',
    productText: 'Shop Games Now'
  },
  {
    image:
      'https://res.cloudinary.com/drosmiklv/image/upload/t_main_game1/v1739134576/game4_j8mvw3.webp',
    quote: 'Gear Up for the Latest Releases with Discounted Pre-orders',
    saleText: 'Pre-order the hottest titles and get early access bonuses',
    productText: 'Buy Now'
  },
  {
    image:
      'https://res.cloudinary.com/drosmiklv/image/upload/t_mail_slider/v1739134577/game2_ctdsaz.webp',
    quote: 'Join the Action: Digital Keys for Multiplayer Games',
    saleText: 'Find your next multiplayer game and dive into the action',
    productText: 'Shop Games Now'
  },
  {
    image:
      'https://res.cloudinary.com/drosmiklv/image/upload/t_mail_slider/v1739134577/game1_lxomop.webp',
    quote: 'Unlock Exclusive Offers on Gaming Gift Cards and More',
    saleText: 'Gift Cards, Steam Wallets, and More – Huge Discounts Today!',
    productText: 'Buy Now'
  }
];

export default function HomeSlider() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % slides.length);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + slides.length) % slides.length);
  };

  return (
    <Carousel
      autoPlay
      navButtonsAlwaysVisible
      indicators={false}
      animation="slide"
      interval={5000}
      timeout={500}
      cycleNavigation
      navButtonsProps={{
        style: {
          backgroundColor: '#00000088',
          borderRadius: 0,
          height: '100%'
        }
      }}
      prevButton={
        <Button
          className="slider-nav-btn prev"
          onClick={handleBack}
          startIcon={<ArrowBackIosIcon />}
        />
      }
      nextButton={
        <Button
          className="slider-nav-btn next"
          onClick={handleNext}
          endIcon={<ArrowForwardIosIcon />}
        />
      }
      fullHeightHover={false}
      className="slide"
      index={activeStep}
      onChangeIndex={setActiveStep}
    >
      {slides.map((slide, index) => (
        <div key={index} className="slide">
          <img src={slide.image} alt="slider" className="slideImage" />
          <div className="slideContent">
            <h2 className="quote" style={{ marginBottom: '20px' }}>
              {slide.quote}
            </h2>
            <h3 className="saleText" style={{ marginBottom: '20px' }}>
              {slide.saleText}
            </h3>
            <Link to="/pages/signin">
              <Button className="productButton">Get Started</Button>
            </Link>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
