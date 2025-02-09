import React from "react";
import { ReactComponent as IrimiLoaderSvg } from "../../../Image/Loader-svg/irimi_loader.svg";
import "./Loader.css";

const IrimiLoader = () => (
  <div className="dropshipping-loader">
    <IrimiLoaderSvg className="spinner" />
  </div>
);

export default IrimiLoader;
