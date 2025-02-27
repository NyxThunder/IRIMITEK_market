import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from "../../layouts/MataData/MataData";
import Sidebar from "../Siderbar";
import Navbar from "../Navbar";
import {
  getOffers,
  deleteOffer,
  updateRetailPrice,
  exportApi,
} from "../../../actions/apiAction";
import NotificationService from "../../NotificationService";
import Loader from "../../layouts/loader/Loader";
import {
  Button,
  Grid,
  Card,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function AdminPanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [retailPrice, setRetailPrice] = useState(""); // For updating retail price
  const [selectedOffer, setSelectedOffer] = useState(null); // Selected offer for editing

  const { loading, offers, error } = useSelector((state) => state.apiOffers);

  useEffect(() => {
    dispatch(getOffers());
  }, [dispatch]);

  const handleDelete = (offerId) => {
    dispatch(deleteOffer(offerId));
  };

  const handleUpdateRetailPrice = (offerId) => {
    if (retailPrice) {
      dispatch(updateRetailPrice(offerId, { retailPrice }));
    } else {
      NotificationService.error("Retail price cannot be empty.");
    }
  };

  const handleExport = async (e) => {
    e.preventDefault();
    // Handle export logic here (new product export)
  };

  const handleEdit = (offer) => {
    setSelectedOffer(offer);
    setRetailPrice(offer.retailPrice); // Pre-fill the retail price for editing
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Admin Panel"} />
          <Grid container spacing={2} justifyContent="center" sx={{ px: 2 }}>
            {/* Sidebar */}
            <Grid item md={3} lg={3} xl={3} className={!toggle ? "firstBox" : "toggleBox"}>
              <Sidebar />
            </Grid>

            {/* Main Content */}
            <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
              <Navbar toggleHandler={() => setToggle(!toggle)} />

              <Grid container spacing={2} sx={{ mt: 1 }}>
                {/* Offers Table Section */}
                <Grid item xs={12}>
                  <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}>
                    Current Offers
                  </Typography>

                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="offers table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Product Name</TableCell>
                          <TableCell>Retail Price</TableCell>
                          <TableCell>Stock</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {offers.map((offer) => (
                          <TableRow key={offer.productId}>
                            <TableCell>{offer.productName}</TableCell>
                            <TableCell>
                              {selectedOffer?.productId === offer.productId ? (
                                <TextField
                                  variant="outlined"
                                  size="small"
                                  type="number"
                                  value={retailPrice}
                                  onChange={(e) => setRetailPrice(e.target.value)}
                                  sx={{ width: 120 }}
                                />
                              ) : (
                                `$${offer.retailPrice}`
                              )}
                            </TableCell>
                            <TableCell>{offer.inventorySize}</TableCell>
                            <TableCell>
                              {selectedOffer?.productId === offer.productId ? (
                                <IconButton
                                  color="primary"
                                  onClick={() => handleUpdateRetailPrice(offer.productId)}
                                >
                                  <SaveIcon />
                                </IconButton>
                              ) : (
                                <IconButton color="primary" onClick={() => handleEdit(offer)}>
                                  <EditIcon />
                                </IconButton>
                              )}
                              <IconButton
                                color="secondary"
                                onClick={() => handleDelete(offer.productId)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>

                {/* Export New Product Section */}
                <Grid item xs={12}>
                  <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                    <form onSubmit={handleExport}>
                      <IconButton sx={{ bgcolor: "black", mx: "auto", mb: 2 }}>
                        <AddCircleOutlineIcon />
                      </IconButton>
                      <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}>
                        Export New Product
                      </Typography>

                      {/* Export Fields for new product */}
                      <TextField
                        label="Product ID"
                        name="productId"
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        label="Retail Price"
                        name="retailPrice"
                        fullWidth
                        required
                        type="number"
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        label="Inventory Size"
                        name="inventorySize"
                        fullWidth
                        required
                        type="number"
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        label="Visibility"
                        name="visibility"
                        fullWidth
                        sx={{ mb: 2 }}
                      />

                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                      >
                        Export Product
                      </Button>
                    </form>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

export default AdminPanel;
