import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import './Card.css';

const MyCard = ({ review }) => {
  const [helpful, setHelpful] = useState(10);
  const [unhelpful, setUnHelpful] = useState(5);
  const [helpfulClicked, setHelpfulClicked] = useState(false);
  const [unhelpfulClicked, setUnhelpfulClicked] = useState(false);

  const helpfulHandler = (type) => {
    if (type === 'up' && !helpfulClicked) {
      setHelpful(helpful + 1);
      setHelpfulClicked(true);

      if (unhelpfulClicked) {
        setUnHelpful(unhelpful - 1);
        setUnhelpfulClicked(false);
      }
    } else if (type === 'down' && !unhelpfulClicked) {
      setUnHelpful(unhelpful + 1);
      setUnhelpfulClicked(true);

      if (helpfulClicked) {
        setHelpful(helpful - 1);
        setHelpfulClicked(false);
      }
    }
  };

  function formateDate(dateString) {
    const date = new Date(dateString);

    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
    return formattedDate;
  }

  return (
    <div className="cardRoot">
      <div className="cardheader">
        <Avatar
          alt="User Avatar"
          src={review.avatar || 'https://i.imgur.com/JSW6mEk.png'}
          className="avatar"
        />
        <Typography variant="body1" className="subHeadings">
          {review.name}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          style={{ marginLeft: '12rem' }}
          className="bodyText"
        >
          {formateDate(review.createdAt)}
        </Typography>
      </div>
      <div>
        <Rating value={4} precision={0.5} size="medium" readOnly className="star" />
      </div>
      <Typography variant="h6" className="title">
        {review.title}
      </Typography>
      <Typography variant="body1" className="commentTxt">
        {review.comment}
      </Typography>
      <Typography variant="body1" className="recommend">
        Would you recommend this product?{' '}
        <span className={review.recommend ? 'yes' : 'no'}>{review.recommend ? 'Yes!' : 'No!'}</span>
      </Typography>
      <div className="helpful">
        <Typography variant="body2" color="textSecondary" className="subHeadings">
          Helpful?
        </Typography>
        <ThumbUpIcon
          className={`thumbIcon ${helpfulClicked ? 'clicked' : ''}`}
          onClick={() => helpfulHandler('up')}
        />
        <Typography>{helpful}</Typography>
        <ThumbDownIcon
          className={`thumbIcon ${unhelpfulClicked ? 'clicked' : ''}`}
          onClick={() => helpfulHandler('down')}
        />
        <Typography>{unhelpful}</Typography>
      </div>
    </div>
  );
};
export default MyCard;
