import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {
  getAllreviews,
  clearErrors,
  deleteProductReview,
} from "../../actions/productAction";
import { useNavigate } from "react-router-dom";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import { Grid, Card } from "@mui/material";
import MUIDataTable from "mui-datatables";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Siderbar";
import { DELETE_REVIEW_RESET } from "../../constants/productsConstatns";
import StarRateIcon from "@mui/icons-material/StarRate";

function ProductReviews() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const [toggle, setToggle] = useState(false);
  const { error, reviews, loading } = useSelector(
    (state) => state.getAllReview
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteReview
  );

  const isMobile = useMediaQuery("(max-width:600px)");
  const [productId, setProductId] = useState("");

  // togle handler =>
  const toggleHandler = () => {
    console.log("toggle");
    setToggle(!toggle);
  };

  const redirectAdminReviews = useCallback(() => {
    navigate("/admin/reviews");
  }, [navigate]);



  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllreviews(productId)); // when in input box string lenght goes ===24 then automatically search occures
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      redirectAdminReviews();
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, alert, deleteError, redirectAdminReviews, isDeleted, productId]);

  // to close the sidebar when the screen size is greater than 1000px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 999 && toggle) {
        setToggle(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [toggle]);

  // delet review from given prodcuts reviews =>
  const deleteReviewHandler = (reviewId) => {

    dispatch(deleteProductReview(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllreviews(productId)); // get this product reviews
  };
  const columns = [
    { name: "id", label: "Review ID", options: { filter: false, sort: true } },
    { name: "user", label: "User", options: { filter: false, sort: true, display: isMobile ? "excluded" : "true" } },
    { name: "comment", label: "Comment", options: { filter: false, sort: false } },
    { name: "recommend", label: "Recommend", options: { filter: true, sort: true, display: isMobile ? "excluded" : "true" } },
    { name: "rating", label: "Rating", options: { filter: true, sort: true, display: isMobile ? "excluded" : "true" } },
    {
      name: "actions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => (
          <DeleteIcon
            sx={{ cursor: "pointer", color: "red", "&:hover": { color: "darkred" } }}
            onClick={() => deleteReviewHandler(tableMeta.rowData[0])}
          />
        ),
      },
    },
  ];

  const data = reviews?.map((item) => [
    item._id,
    item.name,
    item.comment,
    item.recommend ? "Yes" : "No",
    item.ratings,
  ]) || [];

  const options = {
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: "none",
    textLabels: {
      body: { noMatch: "No Reviews Found" },
    },
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50],
    setTableProps: () => ({
      style: { width: "100%", overflowX: "auto" },
    }),
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`ALL PRODUCTS - Admin`} />
          <Grid container spacing={2} justifyContent="center" sx={{ px: 2, overflowX: "hidden" }}>
            {/* Sidebar - 25% on `md+`, hidden on `sm` */}

            <Grid item md={3} lg={3} xl={3} className={!toggle ? "firstBox" : "toggleBox"}>
              <Sidebar />
            </Grid>

            {/* Main Content - 75% on `md+`, 100% on `sm` */}
            <Grid item xs={12} sm={12} md={9} lg={9} xl={9} sx={{ overflowX: "auto" }}>
              {/* Navbar (Full Width) */}
              <Grid item xs={12}>
                <Navbar toggleHandler={toggleHandler} />
              </Grid>

              {/* Input Section */}
              {/* Review Search Form */}
              <Grid item spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12}>
                  <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                    <form onSubmit={productReviewsSubmitHandler} style={{ textAlign: "center" }}>
                      <Avatar sx={{ bgcolor: "black", mx: "auto", mb: 1 }}>
                        <StarRateIcon />
                      </Avatar>
                      <Typography variant="h5" sx={{ fontWeight: "bold", color: "#414141", mb: 2 }}>
                        Search Reviews
                      </Typography>
                      <TextField
                        variant="outlined"
                        fullWidth
                        label="Product ID"
                        required
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        sx={{ mb: 2 }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <StarIcon sx={{ color: "#414141" }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ bgcolor: "black", "&:hover": { bgcolor: "red" } }}
                        disabled={loading || productId === ""}
                      >
                        Search
                      </Button>
                    </form>
                  </Card>
                </Grid>
              </Grid>


              {/* Reviews Table */}
              <Grid item xs={12} sx={{ mt: 3, overflowX: "auto" }}>
                <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                  <MUIDataTable title={"All Reviews"} data={data} columns={columns} options={options} />
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

export default ProductReviews;