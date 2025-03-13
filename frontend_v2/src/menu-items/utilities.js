// assets
// import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons-react';
import TextFieldsIcon from '@mui/icons-material/TextFieldsOutlined';
import PaletteIcon from '@mui/icons-material/PaletteOutlined';
import FilterDramaIcon from '@mui/icons-material/FilterDramaOutlined';
import ToysIcon from '@mui/icons-material/ToysOutlined';

// constant
const icons = {
  TextFieldsIcon,
  PaletteIcon,
  FilterDramaIcon,
  ToysIcon
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'Typography',
      type: 'item',
      url: '/utils/typography',
      icon: icons.TextFieldsIcon,
      breadcrumbs: false
    },
    {
      id: 'util-color',
      title: 'Color',
      type: 'item',
      url: '/utils/color',
      icon: icons.PaletteIcon,
      breadcrumbs: false
    },
    {
      id: 'util-shadow',
      title: 'Shadow',
      type: 'item',
      url: '/utils/shadow',
      icon: icons.FilterDramaIcon,
      breadcrumbs: false
    },
    {
      id: 'icons',
      title: 'Icons',
      type: 'collapse',
      icon: icons.ToysIcon,
      children: [
        {
          id: 'tabler-icons',
          title: 'Tabler Icons',
          type: 'item',
          url: '/utils/icons/tablericons',
          breadcrumbs: false
        },
        {
          id: 'material-icons',
          title: 'Material Icons',
          type: 'item',
          url: '/utils/icons/materialicons',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default utilities;
