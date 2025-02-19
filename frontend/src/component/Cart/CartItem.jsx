// // import React from "react";
// // import {
// //   Card,
// //   CardMedia,
// //   CardContent,
// //   Typography,
// //   IconButton,
// //   Input,
// // } from "@mui/material";
// // import DeleteIcon from "@mui/icons-material/Delete";
// // import RemoveIcon from "@mui/icons-material/Remove";
// // import AddIcon from "@mui/icons-material/Add";
// // import {
// //   dispalyMoney,
// //   generateDiscountedPrice,

// // } from "../DisplayMoney/DisplayMoney";
// // import "./CartItem.css";

// // function CartItem({
// //   deleteCartItems,
// //   item,
// //   decreaseQuantity,
// //   increaseQuantity,
// //   length,
// // }) {
// //   /// calculate price after discount

// //   let finalPrice = generateDiscountedPrice(item.price);
// //   let discountedPrice = item.price - finalPrice;
// //   discountedPrice = dispalyMoney(discountedPrice);
// //   let total = finalPrice * item.quantity;
// //   total = dispalyMoney(total);
// //   finalPrice = dispalyMoney(finalPrice);

// //   return (
// //     <Card className={length < 2 ? "root11" : "roots11"}>
// //       <CardMedia
// //         className="media"
// //         image={item.image}
// //         title={item.name}
// //       />
// //       <CardContent className="content">
// //         <div className="contentTop">
// //           <div className="cartHeader">
// //             <Typography variant="subtitle1" className="title">
// //               {item.name}
// //             </Typography>

// //             <IconButton
// //               aria-label="delete"
// //               className="cartDeleteIcon"
// //               onClick={() => deleteCartItems(item.productId)}
// //             >
// //               <DeleteIcon />
// //             </IconButton>
// //           </div>

// //           <div className="priceItem">
// //             <Typography className="cartSubHeadings" variant="body2">
// //               Price:
// //             </Typography>
// //             <Typography variant="subtitle1" className="itemPrice">
// //               {finalPrice}
// //             </Typography>
// //             <Typography
// //               variant="caption"
// //               component="span"
// //               color="black"
// //               className="itemOldPrice"
// //             >
// //               <del>{discountedPrice}</del>
// //             </Typography>
// //           </div>
// //         </div>
// //         <div className="contentBottom">
// //           <div className="prod_details_additem">
// //             <h5>QTY:</h5>
// //             <div className="additem">
// //               <IconButton
// //                 onClick={() => decreaseQuantity(item.productId, item.quantity)}
// //                 className="additem_decrease"
// //               >
// //                 <RemoveIcon />
// //               </IconButton>
// //               <Input
// //                 readOnly
// //                 type="number"
// //                 value={item.quantity}
// //                 className="input"
// //               />
// //               <IconButton
// //                 onClick={() =>
// //                   increaseQuantity(item.productId, item.quantity, item.stock)
// //                 }
// //                 className="additem_increase"
// //               >
// //                 <AddIcon />
// //               </IconButton>
// //             </div>
// //           </div>

// //           <div className="priceItem">
// //             <Typography variant="body2" className="cartSubHeadings">
// //               TOTAL:
// //             </Typography>
// //             <Typography variant="subtitle1" className="price">
// //               {total}
// //             </Typography>
// //           </div>
// //         </div>
// //       </CardContent>
// //     </Card>
// //   );
// // }

// // export default CartItem;



// import React from "react";
// import {
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   IconButton,
//   Input,
//   Grid,
//   Box,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import RemoveIcon from "@mui/icons-material/Remove";
// import AddIcon from "@mui/icons-material/Add";
// import {
//   dispalyMoney,
//   generateDiscountedPrice,
// } from "../DisplayMoney/DisplayMoney";

// const CartItem = ({ deleteCartItems, item, decreaseQuantity, increaseQuantity }) => {
//   let finalPrice = generateDiscountedPrice(item.price);
//   let discountedPrice = item.price - finalPrice;
//   discountedPrice = dispalyMoney(discountedPrice);
//   let total = finalPrice * item.quantity;
//   total = dispalyMoney(total);
//   finalPrice = dispalyMoney(finalPrice);

//   return (
//     <Card sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, p: 2, borderRadius: 2, boxShadow: 3 }}>
//       {/* Product Image */}
//       <CardMedia
//         component="img"
//         image={item.image}
//         alt={item.name}
//         sx={{
//           width: { xs: "100%", md: 150 },
//           height: { xs: "200px", md: 150 },
//           objectFit: "cover",
//           borderRadius: 2,
//         }}
//       />

//       {/* Product Details */}
//       <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
//         {/* Top Section */}
//         <Grid container justifyContent="space-between" alignItems="center">
//           <Typography variant="subtitle1" fontWeight="bold" sx={{ flex: 1 }}>
//             {item.name}
//           </Typography>
//           <IconButton onClick={() => deleteCartItems(item.productId)} color="error">
//             <DeleteIcon />
//           </IconButton>
//         </Grid>

//         {/* Price Details */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <Typography variant="body2" color="text.secondary">
//             Price:
//           </Typography>
//           <Typography variant="subtitle1" fontWeight="bold">
//             {finalPrice}
//           </Typography>
//           <Typography variant="caption" color="gray" sx={{ textDecoration: "line-through" }}>
//             {discountedPrice}
//           </Typography>
//         </Box>

//         {/* Quantity Controls */}
//         <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <Typography variant="body2" fontWeight="bold">
//               QTY:
//             </Typography>
//             <IconButton onClick={() => decreaseQuantity(item.productId, item.quantity)} disabled={item.quantity <= 1}>
//               <RemoveIcon />
//             </IconButton>
//             <Input
//               readOnly
//               type="number"
//               value={item.quantity}
//               sx={{
//                 width: "40px",
//                 textAlign: "center",
//                 fontSize: "16px",
//                 "& input": { textAlign: "center" },
//               }}
//             />
//             <IconButton onClick={() => increaseQuantity(item.productId, item.quantity, item.stock)}>
//               <AddIcon />
//             </IconButton>
//           </Box>

//           {/* Total Price */}
//           <Box>
//             <Typography variant="body2" fontWeight="bold">
//               TOTAL:
//             </Typography>
//             <Typography variant="subtitle1" fontWeight="bold">
//               {total}
//             </Typography>
//           </Box>
//         </Grid>
//       </CardContent>
//     </Card>
//   );
// };

// export default CartItem;



import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Input,
  Grid,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {
  dispalyMoney,
  generateDiscountedPrice,
} from "../DisplayMoney/DisplayMoney";

const CartItem = ({ deleteCartItems, item, decreaseQuantity, increaseQuantity }) => {
  let finalPrice = generateDiscountedPrice(item.price);
  let discountedPrice = item.price - finalPrice;
  discountedPrice = dispalyMoney(discountedPrice);
  let total = finalPrice * item.quantity;
  total = dispalyMoney(total);
  finalPrice = dispalyMoney(finalPrice);

  return (
    <Card sx={{ paddingLeft: 2, borderRadius: 2, boxShadow: 3 }}>
      <Grid container spacing={2}>
        {/* Image Section */}
        <Grid item xs={12} md={4} display="flex" justifyContent="center">
          <CardMedia
            component="img"
            image={item.image}
            alt={item.name}
            sx={{
              width: { xs: "100%", md: 150 },
              height: { xs: "200px", md: 150 },
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
        </Grid>

        {/* Content Section */}
        <Grid item xs={12} md={8}>
          <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            {/* Top Section */}
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle1" fontWeight="bold" sx={{ flex: 1 }}>
                {item.name}
              </Typography>
              <IconButton onClick={() => deleteCartItems(item.productId)} color="error">
                <DeleteIcon />
              </IconButton>
            </Grid>

            {/* Price Details */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Price:
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                {finalPrice}
              </Typography>
              <Typography variant="caption" color="gray" sx={{ textDecoration: "line-through" }}>
                {discountedPrice}
              </Typography>
            </Box>

            {/* Quantity Controls */}
            <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2, mb:2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body2" fontWeight="bold">
                  QTY:
                </Typography>
                <IconButton onClick={() => decreaseQuantity(item.productId, item.quantity)} disabled={item.quantity <= 1}>
                  <RemoveIcon />
                </IconButton>
                <Input
                  readOnly
                  type="number"
                  value={item.quantity}
                  sx={{
                    width: "40px",
                    textAlign: "center",
                    fontSize: "16px",
                    "& input": { textAlign: "center" },
                  }}
                />
                <IconButton onClick={() => increaseQuantity(item.productId, item.quantity, item.stock)}>
                  <AddIcon />
                </IconButton>
              </Box>

              {/* Total Price */}
              <Box>
                <Typography variant="body2" fontWeight="bold">
                  TOTAL:
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  {total}
                </Typography>
              </Box>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CartItem;
