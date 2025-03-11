import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        pt: 3,
        mt: 'auto'
      }}
    >
      <Typography variant="caption">
        &copy; All rights reserved{' '}
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
      <Stack
        direction="row"
        sx={{ gap: 1.5, alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Link
          component={RouterLink}
          to="/mock-twitter"
          underline="hover"
          target="_blank"
          variant="caption"
          color="text.primary"
        >
          Twitter
        </Link>
        <Link
          component={RouterLink}
          to="/mock-discord"
          underline="hover"
          target="_blank"
          variant="caption"
          color="text.primary"
        >
          Discord
        </Link>
        <Link
          component={RouterLink}
          to="/mock-facebook"
          underline="hover"
          target="_blank"
          variant="caption"
          color="text.primary"
        >
          Facebook
        </Link>
        <Link
          component={RouterLink}
          to="/mock-instagram"
          underline="hover"
          target="_blank"
          variant="caption"
          color="text.primary"
        >
          Instagram
        </Link>
        <Link
          component={RouterLink}
          to="/mock-linkedin"
          underline="hover"
          target="_blank"
          variant="caption"
          color="text.primary"
        >
          LinkedIn
        </Link>
      </Stack>
    </Stack>
  );
}
