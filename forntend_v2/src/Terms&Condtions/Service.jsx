import React from "react";
import {
  CloudDownload,
  Security,
  LocalOffer,
  CreditCard,
} from "@mui/icons-material";
import "./Service.css";

const servicesData = [
  {
    id: 1,
    icon: <CloudDownload fontSize="large" />,
    title: "Instant Access",
    info: "Download your software immediately after purchase",
  },
  {
    id: 2,
    icon: <Security fontSize="large" />,
    title: "Genuine Software",
    info: "100% Original & Authorized Licenses",
  },
  {
    id: 3,
    icon: <LocalOffer fontSize="large" />,
    title: "Exclusive Deals",
    info: "Discounts and special offers on popular software",
  },
  {
    id: 4,
    icon: <CreditCard fontSize="large" />,
    title: "Secure Payments",
    info: "SSL Encryption for safe and secure transactions",
  },
];

const Services = () => {

  return (
    <>
      <div  className="Services_section">
        <div className="Services_wrapper" style={{ width: "100%" }}>
          {servicesData.map((item) => {
            
            return (
              <div className="Services_card" key={item.id}>
                <div className="Services_icon">{item.icon}</div>
                <div>
                  <div className="Services_cardTitle">{item.title}</div>
                  <div className="Services_cardInfo">{item.info}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Services;
