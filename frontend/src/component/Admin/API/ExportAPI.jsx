import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import NotificationService, { NotificationContainer } from '../../NotificationService';
import MetaData from "../../layouts/MataData/MataData";
import Loader from "../../layouts/loader/Loader";
import Sidebar from "../Siderbar";
import Navbar from "../Navbar";
import { exportApi, clearErrors } from "../../../actions/apiAction";
import useFormValidation from "../../hook/useFormValidation";
import axios from "axios";
import {
    Avatar,
    TextField,
    Typography,
    Button,
    Grid,
    Card,
    InputAdornment,
    FormControlLabel,
    Switch,
    Box,
    MenuItem,
    Select
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { EXPORT_API_RESET } from "../../../constants/apiConstatns";

function ExportAPI() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);
    const toggleHandler = () => setToggle(!toggle);

    const [formData, setFormData] = useState({
        productId: "",
        retailPrice: "",
        inventorySize: 1,
        visibility: "all"
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleExport = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/api/v1/admin/api/export", formData);
            NotificationService.success("Product exported successfully!");
            navigate("/admin/g2a_dashboard");
        } catch (error) {
            NotificationService.error("Failed to export product.");
            console.error("Export error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title={"Export API"} />
                    <Grid container spacing={2} justifyContent="center" sx={{ px: 2 }}>
                        {/* Sidebar */}
                        <Grid item md={3} lg={3} xl={3} className={!toggle ? "firstBox" : "toggleBox"}>
                            <Sidebar />
                        </Grid>

                        {/* Main Content */}
                        <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                            {/* Navbar */}
                            <Grid item xs={12} sm={12}>
                                <Navbar toggleHandler={toggleHandler} />
                            </Grid>

                            {/* Form Section */}
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={12}>
                                    <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                                        <form onSubmit={handleExport}>
                                            <Avatar sx={{ bgcolor: "black", mx: "auto", mb: 1 }}>
                                                <AddCircleOutlineIcon />
                                            </Avatar>
                                            <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}>
                                                Export Product to G2A
                                            </Typography>

                                            {/* Product ID */}
                                            <TextField
                                                label="Product ID"
                                                name="productId"
                                                fullWidth
                                                required
                                                value={formData.productId}
                                                onChange={handleChange}
                                                sx={{ mb: 2 }}
                                            />

                                            {/* Retail Price */}
                                            <TextField
                                                label="Retail Price"
                                                name="retailPrice"
                                                fullWidth
                                                required
                                                type="number"
                                                value={formData.retailPrice}
                                                onChange={handleChange}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                }}
                                                sx={{ mb: 2 }}
                                            />

                                            {/* Inventory Size */}
                                            <TextField
                                                label="Inventory Size"
                                                name="inventorySize"
                                                fullWidth
                                                required
                                                type="number"
                                                value={formData.inventorySize}
                                                onChange={handleChange}
                                                sx={{ mb: 2 }}
                                            />

                                            {/* Visibility */}
                                            <Select
                                                name="visibility"
                                                fullWidth
                                                value={formData.visibility}
                                                onChange={handleChange}
                                                sx={{ mb: 2 }}
                                            >
                                                <MenuItem value="all">All</MenuItem>
                                                <MenuItem value="retail">Retail</MenuItem>
                                                <MenuItem value="business">Business</MenuItem>
                                            </Select>

                                            {/* Submit Button */}
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                disabled={loading}
                                                sx={{ mt: 2 }}
                                            >
                                                {loading ? "Exporting..." : "Export Product"}
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

export default ExportAPI;
