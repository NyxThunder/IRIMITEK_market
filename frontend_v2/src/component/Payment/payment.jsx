import { useState } from 'react';
import { Container, Card, CardContent, Typography, Button, TextField, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function SubscriptionPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
        py: 4
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 400, p: 4, textAlign: 'center', boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Subscribe to Our Newsletter
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Get the latest updates and exclusive offers.
          </Typography>

          {submitted ? (
            <Box display="flex" flexDirection="column" alignItems="center" color="success.main">
              <CheckCircleIcon sx={{ fontSize: 48, mb: 1 }} />
              <Typography variant="h6">Thank you for subscribing!</Typography>
            </Box>
          ) : (
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <TextField
                type="email"
                label="Enter your email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Subscribe
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6" fontWeight="bold">
          Choose Your Plan
        </Typography>
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={3} mt={2}>
          <Card sx={{ p: 3, textAlign: 'center', boxShadow: 3, width: 200 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Basic Plan
            </Typography>
            <Typography variant="body2" color="text.secondary">
              $9.99/month
            </Typography>
            <Button variant="contained" color="success" sx={{ mt: 2 }}>
              Select
            </Button>
          </Card>
          <Card sx={{ p: 3, textAlign: 'center', boxShadow: 3, width: 200 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Premium Plan
            </Typography>
            <Typography variant="body2" color="text.secondary">
              $19.99/month
            </Typography>
            <Button variant="contained" color="success" sx={{ mt: 2 }}>
              Select
            </Button>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
