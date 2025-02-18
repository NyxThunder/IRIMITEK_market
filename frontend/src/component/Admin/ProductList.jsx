import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

import {
  clearErrors,
  getAdminProducts,
  deleteProduct,
} from "../../actions/productAction";
import MUIDataTable from "mui-datatables";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MetaData from "../layouts/MataData/MataData";
import Loader from "../layouts/loader/Loader";
import Sidebar from "./Siderbar";
import Navbar from "./Navbar";
import { Grid, Card } from "@mui/material";
import { DELETE_PRODUCT_RESET } from "../../constants/productsConstatns";

function ProductList() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  const { error, products, loading } = useSelector((state) => state.products) || {};
  const { error: deleteError, loading: deleting, isDeleted } = useSelector((state) => state.deleteUpdateProduct) || {};

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProducts());
  }, [dispatch, error, alert, deleteError, isDeleted]);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const columns_dataTable = [
    {
      name: "product_id",
      label: "Product ID",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "stock",
      label: "Stock",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "price",
      label: "Price",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const id = tableMeta.rowData[0];
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link to={`/admin/product/${id}`} style={{ marginRight: "1rem" }}>
                <EditIcon className="icon-" />
              </Link>
              <div onClick={() => deleteProductHandler(id)}>
                <DeleteIcon className="iconbtn" />
              </div>
            </div>
          );
        },
      },
    },
  ];

  const data = products
    ? products.map((item) => [
      item._id,
      item.name,
      item.Stock,
      item.price,
    ])
    : [];

  const options = {
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: true,
    textLabels: {
      body: { noMatch: "No Products Found" },
    },
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50],
    setTableProps: () => ({
      style: { width: "100%", overflowX: "auto" },
    }),
  };

  const toggleHandler = () => {
    setToggle(!toggle);
  };

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

  return (
    <>
      {loading || deleting? (
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
            <Grid item xs={12} sm={12} md={9} lg={9} xl={9} sx={{ overflowX: "auto" }} >
              {/* Navbar (Full Width) */}
              <Grid item xs={12} sm={12}>
                <Navbar toggleHandler={toggleHandler} />
              </Grid>

              {/* Input Section */}
              <Grid item xs={12} sx={{ mt: 3 }}>
                <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                  <MUIDataTable
                    title={"All Products"}
                    data={data}
                    columns={columns_dataTable}
                    options={options}
                  />
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

export default ProductList;
