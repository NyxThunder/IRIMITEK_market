import React from 'react';
import {
  Divider,
  Typography,
  Box,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem
} from '@mui/material';
import NotificationService from '../component/NotificationService';
import { useNavigate } from 'react-router-dom';
import MetaData from '../component/layouts/MataData/MataData';
import useFormValidation from '../component/hook/useFormValidation';
import './Contact.css';

const ContactForm = () => {
  const navigate = useNavigate();

  // Validation rules
  const validationRules = {
    issue: (value) => (!value ? 'Please select an issue.' : ''),
    detail: (value) => (!value ? 'Please select a detail.' : ''),
    language: (value) => (!value ? 'Please select a language.' : ''),
    email: (value) =>
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ? 'Invalid email address.' : '',
    message: (value) => (!value.trim() ? 'Message cannot be empty.' : '')
  };

  // Use Validation Hook
  const { values, errors, handleChange, validateForm } = useFormValidation(
    { issue: '', detail: '', language: '', email: '', message: '' },
    validationRules
  );

  const handleCall = () => {
    window.location.href = 'tel:+171280446';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    NotificationService.success('Your message has been sent successfully');
    navigate('/');
  };

  return (
    <Box className="root_contactus">
      <MetaData title="Contact Us" />
      <div className="contact_Container_contactus">
        <Typography variant="h4" className="title_contact_us">
          Contact Us
        </Typography>

        <Divider className="divider_contact" />

        <Typography variant="h5" className="helpTitle_contact_us">
          Need Help?
        </Typography>

        <Typography variant="body1" className="para_contact">
          We have live chat available. If it isn’t there, call us at{' '}
          <strong
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={handleCall}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleCall();
              }
            }}
          >
            +1 712 804 46
          </strong>
          .
        </Typography>

        <Typography variant="body1" className="para_contact">
          <span className="para2">7:00-6:00 MST Monday-Friday</span>
          <br />
          <span className="para2">9:00-4:00 MST Saturday</span>
          <br />
          <span className="para2">Closed Sunday</span>
        </Typography>

        <Typography variant="body1" className="para_contact">
          Outside these hours? Fill out our support form below.
        </Typography>

        <Typography variant="body1" className="address_contacts">
          <span style={{ fontWeight: '500', paddingBottom: '0.5rem' }}>
            IrmiTEK Store, Pvt Ltd.
          </span>
          <br />
          Detailed Address1
          <br />
          Detailed Address2
          <br />
          Estonia
        </Typography>

        <div
          className="buttonGroup"
          style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}
        >
          <a href="#issue-select" style={{ textDecoration: 'none', flex: 1 }}>
            <Button variant="contained" className="mainButton" fullWidth>
              Support Form
            </Button>
          </a>
          <Button
            variant="contained"
            className="mainButton"
            onClick={handleCall}
            style={{ textDecoration: 'none', flex: 1 }}
            fullWidth
          >
            Call Us
          </Button>
        </div>

        <Divider className="divider_contact" />

        <div className="supportForm">
          <Typography variant="h5" className="title_contact_us" sx={{ pb: 2 }}>
            Support Form
          </Typography>

          <Typography variant="body1" className="para_contact">
            Need a quicker answer? Look for our chat icon on the right-hand side.
          </Typography>

          <form className="formContainer_container" onSubmit={handleSubmit}>
            {/* Issue Selection */}
            <div className="SelectOption_contact">
              <Typography variant="body2" className="lableText_contact">
                ISSUE *
              </Typography>
              <FormControl fullWidth error={!!errors.issue}>
                <Select name="issue" value={values.issue} onChange={handleChange}>
                  <MenuItem value="">
                    <em>Select an Issue</em>
                  </MenuItem>
                  <MenuItem value="e-commerce">E-Commerce</MenuItem>
                  <MenuItem value="app">App</MenuItem>
                </Select>
                <Typography variant="caption" color="error">
                  {errors.issue}
                </Typography>
              </FormControl>
            </div>

            {/* Detail Selection */}
            <div className="SelectOption_contact">
              <Typography variant="body2" className="lableText_contact">
                DETAIL *
              </Typography>
              <FormControl fullWidth error={!!errors.detail}>
                <Select name="detail" value={values.detail} onChange={handleChange}>
                  <MenuItem value="">
                    <em>Select a Detail</em>
                  </MenuItem>
                  <MenuItem value="availability">Availability</MenuItem>
                  <MenuItem value="return/exchange">Return/Exchange</MenuItem>
                  <MenuItem value="technical-support">Technical Support</MenuItem>
                  <MenuItem value="invoicing">Invoicing</MenuItem>
                  <MenuItem value="tracking-info">Tracking Info</MenuItem>
                  <MenuItem value="others">Others</MenuItem>
                </Select>
                <Typography variant="caption" color="error">
                  {errors.detail}
                </Typography>
              </FormControl>
            </div>

            {/* Language Selection */}
            <div className="SelectOption_contact">
              <Typography variant="body2" className="lableText_contact">
                LANGUAGE *
              </Typography>
              <FormControl fullWidth error={!!errors.language}>
                <Select name="language" value={values.language} onChange={handleChange}>
                  <MenuItem value="">
                    <em>Select a Language</em>
                  </MenuItem>
                  <MenuItem value="english">English</MenuItem>
                  <MenuItem value="hindi">Hindi</MenuItem>
                  <MenuItem value="japanese">Japanese</MenuItem>
                  <MenuItem value="chinese">Chinese</MenuItem>
                  <MenuItem value="german">German</MenuItem>
                </Select>
                <Typography variant="caption" color="error">
                  {errors.language}
                </Typography>
              </FormControl>
            </div>

            {/* Email Input */}
            <div className="SelectOption_contact">
              <Typography variant="body2" className="lableText_contact">
                EMAIL *
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter Your Email *"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </div>

            {/* Message Input */}
            <div className="SelectOption_contact">
              <Typography variant="body2" className="lableText_contact">
                MESSAGE *
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                placeholder="Enter Your Message *"
                name="message"
                value={values.message}
                onChange={handleChange}
                error={!!errors.message}
                helperText={errors.message}
              />
            </div>

            <Button type="submit" variant="contained" className="mainButton" fullWidth>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </Box>
  );
};

export default ContactForm;
