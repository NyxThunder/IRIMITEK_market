import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detects small screens

  return (
    <Stack
      direction={isMobile ? 'column' : 'row'}
      spacing={isMobile ? 2 : 0}
      sx={{
        alignItems: 'center',
        justifyContent: isMobile ? 'center' : 'space-between',
        textAlign: isMobile ? 'center' : 'left',
        pt: 3,
        pb: 3,
        px: isMobile ? 2 : 6,
        bgcolor: 'background.default', // Keeps original color
        borderRadius: 2, // Added border radius
        mt: 3 // Added margin top
      }}
    >
      {/* Company Info */}
      <Typography variant="caption">
        &copy; {new Date().getFullYear()} All rights reserved by{' '}
        <Typography
          component={Link}
          href="https://irmitek.com/about-us/"
          underline="hover"
          target="_blank"
          color="secondary.main"
        >
          Irmitek
        </Typography>
      </Typography>

      {/* Social Media Links */}
      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          flexWrap: 'wrap',
          justifyContent: isMobile ? 'center' : 'flex-end'
        }}
      >
        {[
          { name: 'Twitter', path: '/mock-twitter' },
          { name: 'Discord', path: '/mock-discord' },
          { name: 'Facebook', path: '/mock-facebook' },
          { name: 'Instagram', path: '/mock-instagram' },
          { name: 'LinkedIn', path: '/mock-linkedin' }
        ].map((item) => (
          <Link
            key={item.name}
            component={RouterLink}
            to={item.path}
            underline="hover"
            target="_blank"
            variant="caption"
            color="text.primary"
          >
            {item.name}
          </Link>
        ))}
      </Stack>
    </Stack>
  );
}
