import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import MetaData from "../../layouts/MataData/MataData";
import Sidebar from "../Siderbar";
import Navbar from "../Navbar";
import MUIDataTable from "mui-datatables";
import {
  getOffers,
  deleteOffer,
  updateRetailPrice,
  exportApi,
  clearErrors,
} from "../../../actions/apiAction";
import NotificationService from "../../NotificationService";
import Loader from "../../layouts/loader/Loader";
import useFormValidation from "../../hook/useFormValidation";
import {
  Button,
  Grid,
  Card,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { EXPORT_API_RESET } from "../../../constants/apiConstatns";

function ExportAPI() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [errors, setErrors] = useState({});
  const queryParams = new URLSearchParams(location.search);
  const apiName = queryParams.get("name");

  const { loading, offers, error } = useSelector((state) => state.allOffers);
  const { error: productError, loading: productLoading, products } = useSelector((state) => state.products) || {};
  const { error: exportError, status, loading: exportLoading, exported, message } = useSelector((state) => state.exportApi) || {};

  const [toggle, setToggle] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [retailPrice, setRetailPrice] = useState("");
  const [inventorySize, setInventorySize] = useState("");

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setRetailPrice("");
    setInventorySize("");
  };

  const validateFields = () => {
    let newErrors = {};
    if (!retailPrice || retailPrice <= 0) newErrors.retailPrice = "Retail Price must be greater than zero.";
    if (!inventorySize || inventorySize <= 0) newErrors.inventorySize = "Inventory Size must be greater than zero.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (error) {
      NotificationService.error(error);
      NotificationService.error("Please connect first. later.");
      dispatch(clearErrors());
    }
    if (productError) {
      NotificationService.success("Failed to import Products!");
      dispatch(clearErrors());
    }
    if (exportError) {
      if (status === 409) {
        NotificationService.error("Conflict: The product already exists as a dropshipping offer.");
      } else if (status === 401) {
        NotificationService.error("Unauthorized: Invalid or expired access token.");
      } else {
        NotificationService.error(exportError);
      }
    }
    if (exported) {
      NotificationService.success(message || "Product exported successfully!");
      dispatch({ type: EXPORT_API_RESET });
    }
    const token = localStorage.getItem(`${apiName}token`);
    // dispatch(getOffers(token));
  }, [dispatch, error, exportError, exported, productError,]);


  const handleExport = () => {
    if (!validateFields()) return;
    const token = localStorage.getItem(`${apiName}token`);
    dispatch(exportApi(id, token, { productId: selectedProduct.productId, productName: selectedProduct.name, retailPrice, inventorySize }));
    handleCloseModal();
  };

  const offerColumns = [
    { name: "productName", label: "Product Name" },
    { name: "retailPrice", label: "Retail Price" },
    { name: "inventorySize", label: "Stock" },
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta) => (
          <IconButton color="secondary" onClick={() => dispatch(deleteOffer(offers[tableMeta.rowIndex].productId))}>
            <DeleteIcon />
          </IconButton>
        ),
      },
    },
  ];

  const productColumns = [
    {
      name: "_id",
      label: "Export",
      options: {
        customBodyRender: (value, tableMeta) => (
          <Button variant="contained" color="primary" onClick={() => handleOpenModal(products[tableMeta.rowIndex])}>
            Export
          </Button>
        ),
      },
    },
    { name: "productId", label: "Product ID of G2A" },
    { name: "name", label: "Name" },
    { name: "Stock", label: "Stock" },
    { name: "price", label: "MinPrice" },
    { name: "retailMinPrice", label: "Retail Min Price" },
    { name: "retailMinBasePrice", label: "Retail Min Base Price" },
  ];

  return (
    <>
      {loading || productLoading || exportLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Admin Panel"} />
          <Grid container spacing={2} justifyContent="center" sx={{ px: 2 }}>
            <Grid item md={3} lg={3} xl={3} className={!toggle ? "firstBox" : "toggleBox"}>
              <Sidebar />
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
              <Navbar toggleHandler={() => setToggle(!toggle)} />
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                    <MUIDataTable title={"Offers"} data={offers} columns={offerColumns} options={{ selectableRows: "none" }} />
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                    <MUIDataTable title={"All Products For DropShipping"} data={products} columns={productColumns} options={{ selectableRows: "none" }} />
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Export Product</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary">
            Product Name: {selectedProduct?.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Current Stock: {selectedProduct?.Stock}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Current Price: {selectedProduct?.price}
          </Typography>
        </DialogContent>
        <DialogContent>
          <TextField
            label="Retail Price"
            fullWidth
            type="number"
            value={retailPrice}
            onChange={(e) => setRetailPrice(e.target.value)}
            error={!!errors.retailPrice}
            helperText={errors.retailPrice}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Inventory Size"
            fullWidth
            type="number"
            value={inventorySize}
            onChange={(e) => setInventorySize(e.target.value)}
            error={!!errors.inventorySize}
            helperText={errors.inventorySize}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">Cancel</Button>
          <Button onClick={handleExport} color="primary" variant="contained">Export</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ExportAPI;
