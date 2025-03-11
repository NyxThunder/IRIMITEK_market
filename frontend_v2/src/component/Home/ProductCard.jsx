import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box
} from '@mui/material';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';
import { dispalyMoney, generateDiscountedPrice } from '../DisplayMoney/DisplayMoney';
import { addItemToCart } from '../../actions/cartAction';
import { useDispatch } from 'react-redux';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  let discountPrice = generateDiscountedPrice(product.price);
  discountPrice = dispalyMoney(discountPrice);
  const oldPrice = dispalyMoney(product.price);

  const truncated = product.description.split(' ').slice(0, 5).join(' ') + '...';
  const nameTruncated = product.name.split(' ').slice(0, 3).join(' ') + '...';

  const addTocartHandler = (id, qty) => {
    dispatch(addItemToCart(id, qty));
  };

  return (
    <Card className="productCardRoot">
      <Link
        className="productCard"
        to={`/product/${product._id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <CardActionArea>
          <CardMedia className="productCardMedia" image={product.images[0].url} />
          <CardContent>
            <Typography gutterBottom color="black" fontWeight="bold" style={{ fontWeight: '700' }}>
              {nameTruncated}
            </Typography>
            <Box display="flex" alignItems="center">
              <Rating
                name="rating"
                value={product.ratings}
                precision={0.1}
                readOnly
                size="small"
                style={{ color: '#ed1c24', marginRight: 8, fontWeight: '400' }}
              />
              <Typography variant="body2" color="textSecondary">
                ({product.numOfReviews})
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="textSecondary"
              component="div"
              className="productCardDescription"
            >
              {truncated}
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="body1" className="productCardOldPrice">
                {oldPrice}
              </Typography>
              <Typography variant="body1" className="productCardFinalPrice">
                {discountPrice}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Link>
      <Box display="flex" justifyContent="center" p={2}>
        <Button
          variant="contained"
          className="productCardButton"
          onClick={() => addTocartHandler(product._id, 1)}
        >
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;
