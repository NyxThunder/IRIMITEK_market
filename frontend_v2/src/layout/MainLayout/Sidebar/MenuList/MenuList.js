// material-ui
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

// project imports
import NavGroup from './NavGroup';
import menuItems from '../../../../menu-items/index';
import Loader from '../../../../ui-component/Loader';

const MenuList = () => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.userData);

  if (loading) {
    return <Loader />;
  } else if (isAuthenticated && user) {

    if (user.role == 'admin') {

      const navItems = menuItems.adminItems.map((item) => {
        switch (item.type) {
          case 'group':
            return <NavGroup key={item.id} item={item} />;
          default:
            return (
              <Typography key={item.id} variant="h6" color="error" align="center">
                Menu Items Error
              </Typography>
            );
        }
      });
      return <>{navItems}</>;
    } else {
      const navItems = menuItems.userItems.map((item) => {
        switch (item.type) {
          case 'group':
            return <NavGroup key={item.id} item={item} />;
          default:
            return (
              <Typography key={item.id} variant="h6" color="error" align="center">
                Menu Items Error
              </Typography>
            );
        }
      });
      return <>{navItems}</>;
    }
  }


};

export default MenuList;
