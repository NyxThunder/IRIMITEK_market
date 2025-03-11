import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import { MENU_OPEN } from '../../../actions/layoutActions';
import Logo from '../../../ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const dispatch = useDispatch();
  const config = { defaultPath: '/' };

  return (
    <ButtonBase
      disableRipple
      onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })}
      component={Link}
      to={config.defaultPath}
    >
      <Logo />
    </ButtonBase>
  );
};

export default LogoSection;
