import React, { useState, lazy, Suspense } from "react";
import { Typography, Grid, Select, MenuItem, Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import IrimiLoader from "../layouts/loader/Loader";
import "./ReviewStyle.css";
import MyCard from "./Card";
import { useSelector } from "react-redux";
import NotificationService, { NotificationContainer } from '../NotificationService';
import { useNavigate } from "react-router-dom";

const DialogBox = lazy(() => import("./DialogBox"));

const ReviewCard = ({ product }) => {
  const { isAuthenticated } = useSelector((state) => state.userData);
  const alert = useAlert();
  const navigate = useNavigate();
  const [sortValue, setSortValue] = useState("highest");
  const [open, setOpen] = useState(false);

  const handleSortChange = (event) => {
    setSortValue(event.target.value);
  };

  const handleClickOpen = () => {
    if (!isAuthenticated) {
      NotificationService.error("Please Login to write a review");
      navigate("/login");
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="reviewRoot">
      <Typography variant="h5" component="h1" className="reviewHeader">
        Users Reviews
      </Typography>
      <Button
        variant="contained"
        className="submitBtn"
        fullWidth
        style={{ marginTop: "2rem" }}
        onClick={handleClickOpen}
      >
        Write your Review
      </Button>

      <Suspense fallback={<IrimiLoader />}>
        <DialogBox open={open} handleClose={handleClose} className="dialog" />
      </Suspense>

      <Grid container alignItems="center" style={{ marginTop: "2rem" }}>
        <Grid item className="ratingContainer">
          <Rating
            value={product?.ratings || 0} // Fix: Ensure value exists
            precision={0.5}
            readOnly
            className="star"
          />
        </Grid>
        <Typography variant="body2" className="ratingNumber">
          {product?.ratings || 0} stars
        </Typography>
        <Grid item>
          <Typography variant="body2">
            <strong>Total Reviews:</strong> {product?.numOfReviews || 0}
          </Typography>
        </Grid>
      </Grid>

      <Grid container justifyContent="flex-end" id="selectContainer">
        <Grid item>
          <Typography variant="body2" style={{ fontSize: "12px" }} className="sortBy">
            SortBy:
          </Typography>
        </Grid>
        <Grid item>
          <Select
            value={sortValue}
            className="selectReviewCard"
            onChange={handleSortChange} // Fix: Use onChange instead of onClick
          >
            <MenuItem value="highest" className="menuItem">
              Highest Rated
            </MenuItem>
            <MenuItem value="lowest" className="menuItem">
              Lowest Rated
            </MenuItem>
            <MenuItem value="latest" className="menuItem">
              Latest Reviews
            </MenuItem>
            <MenuItem value="oldest" className="menuItem">
              Oldest Reviews
            </MenuItem>
          </Select>
        </Grid>
      </Grid>

      <div className="review-container">
        {product?.reviews?.map((review) => (
          <MyCard key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewCard;
