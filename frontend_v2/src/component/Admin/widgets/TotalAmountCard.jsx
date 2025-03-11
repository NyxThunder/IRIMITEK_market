import React from 'react';
import { Grid, Card, Typography, Box, IconButton } from '@mui/material';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PropTypes from 'prop-types';

const TotalAmountCard = ({ icon, title, amount, percentage, isPositive, onExpand }) => {
  return (
    <Card sx={{ minWidth: 200, p: 2, textAlign: 'center', boxShadow: 3, borderRadius: 2 }}>
      {/* First Line: Total Amount with Expand Icon */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          {icon && <Box color={'#414141'} component={icon} sx={{ mr: 1 }} />}
          <Typography variant="h6" color={'#414141'}>
            {title}
          </Typography>
        </Box>
        <IconButton onClick={onExpand}>
          <TableRowsIcon sx={{ color: '#414141' }} />
        </IconButton>
      </Box>

      {/* Second Line: Amount */}
      <Typography variant="h4" fontWeight="bold" color="black" mt={1}>
        {amount}
      </Typography>

      {/* Third Line: Percentage Change with Arrow */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
        <Box display="flex" alignItems="center">
          {isPositive ? (
            <ArrowUpwardIcon sx={{ color: 'green', mr: 1 }} />
          ) : (
            <ArrowDownwardIcon sx={{ color: 'red', mr: 1 }} />
          )}
          <Typography color={isPositive ? 'green' : 'red'} fontWeight="bold">
            {percentage}%
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          in the last month
        </Typography>
      </Box>
    </Card>
  );
};

TotalAmountCard.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
  isPositive: PropTypes.bool.isRequired,
  onExpand: PropTypes.func.isRequired
};

export default TotalAmountCard;
