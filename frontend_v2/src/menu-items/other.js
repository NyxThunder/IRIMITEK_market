// assets
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import HelpIcon from '@mui/icons-material/Help';

// constant
const icons = {
  ChromeReaderModeIcon,
  HelpIcon
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    {
      id: 'sample-page',
      title: 'Sample Page',
      type: 'item',
      url: '/sample-page',
      icon: icons.ChromeReaderModeIcon,
      breadcrumbs: false
    },
    {
      id: 'documentation',
      title: 'Documentation',
      type: 'item',
      url: 'https://codedthemes.gitbook.io/berry/',
      icon: icons.HelpIcon,
      external: true,
      target: true
    }
  ]
};

export default other;
