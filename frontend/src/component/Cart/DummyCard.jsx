import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useAlert } from "react-alert";
import "./DummyCard.css";

const DummyCard = ({ onClose }) => {
const alert = useAlert();
  const handleValueCopy = (value) => {
    navigator.clipboard.writeText(value);
     alert.success("Number Copied");
  };

  return (
    <>
      <Dialog
        open={true}
        onClose={onClose}
        classes={{ paper: "dialogPaper"}}
      >
        <DialogTitle disableTypography>Dummy Card</DialogTitle>
        <DialogContent className="dialogContent">
          <div className="creditCard">
            <div className="closeButton" onClick={onClose}>
              X
            </div>
            <div className="chip"></div>
            <div
              className="creditCardText"
              onClick={() => handleValueCopy("CREDIT CARD")}
            >
              CREDIT CARD
            </div>
            <div
              className="cardNumber"
              onClick={() => handleValueCopy("4242 4242 4242 4242")}
            >
              4242 4242 4242 4242
            </div>
            <div className="cardDetails">
              <div>
                <div className="label">EXPIRY</div>
                <div
                  className="value"
                  onClick={() => handleValueCopy("12/23")}
                >
                  12/23
                </div>
              </div>
              <div>
                <div className="label">CVV</div>
                <div
                  className="value"
                  onClick={() => handleValueCopy("123")}
                >
                  123
                </div>
              </div>
            </div>
            <div
              className="value"
              onClick={() => handleValueCopy("Robert Downey Jr")}
            >
              Robert Downey Jr
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            className="hint"
            onClick={() => handleValueCopy("4242 4242 4242 4242")}
          >
            Click to copy card number
          </Button>
         
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DummyCard;
