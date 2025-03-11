import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import NotificationService, { NotificationContainer } from '../NotificationService';
import './DummyCard.css';

const DummyCard = ({ onClose }) => {
  const handleValueCopy = (value) => {
    navigator.clipboard.writeText(value);
    NotificationService.success('Number Copied');
  };

  return (
    <>
      <Dialog open={true} onClose={onClose} classes={{ paper: 'dialogPaper' }}>
        <DialogTitle disableTypography>Dummy Card</DialogTitle>
        <DialogContent className="dialogContent">
          <div className="creditCard">
            <Button className="closeButton" onClick={onClose}>
              X
            </Button>
            <div className="chip"></div>
            <Button className="creditCardText" onClick={() => handleValueCopy('CREDIT CARD')}>
              CREDIT CARD
            </Button>
            <Button className="cardNumber" onClick={() => handleValueCopy('4242 4242 4242 4242')}>
              4242 4242 4242 4242
            </Button>
            <div className="cardDetails">
              <div>
                <div className="label">EXPIRY</div>
                <Button className="value" onClick={() => handleValueCopy('12/23')}>
                  12/23
                </Button>
              </div>
              <div>
                <div className="label">CVV</div>
                <Button className="value" onClick={() => handleValueCopy('123')}>
                  123
                </Button>
              </div>
            </div>
            <Button className="value" onClick={() => handleValueCopy('Robert Downey Jr')}>
              Robert Downey Jr
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button className="hint" onClick={() => handleValueCopy('4242 4242 4242 4242')}>
            Click to copy card number
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DummyCard;
