import React from 'react';
import { AppBar, Toolbar, IconButton, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleHandler }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 2 }}>
      <Toolbar>
        <Grid container display="flex" justifyContent="space-between">
          {/* Left Side - Show MenuIcon only on Mobile */}
          <Grid item xs={2} sm={1} display={{ xs: 'block', md: 'none' }}>
            <IconButton
              onClick={toggleHandler}
              sx={{ color: '#000', marginTop: '6px', alignSelf: 'center' }}
            >
              <MenuIcon />
            </IconButton>
          </Grid>

          {/* Center - Logo */}
          <Grid
            item
            xs={10}
            sm={11}
            md={12}
            display="flex"
            justifyContent={{ xs: 'flex-end', sm: 'flex-end', md: 'center' }}
          >
            <Link to="/admin/dashboard">
              <img
                src="https://res.cloudinary.com/drosmiklv/image/upload/v1739072360/logo_e8esxt.webp"
                alt="logo"
                style={{ height: '50px', maxWidth: '180px', marginLeft: { xs: '0', md: '0' } }}
              />
            </Link>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
